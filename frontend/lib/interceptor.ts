import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

// track whether a request has already been retried after refresh.
interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// auth endpoints where we never want to trigger a refresh flow.
const AUTH_ACTION_ROUTES = [ "/auth/login", "/auth/register", "/auth/refresh", "/auth/logout", ];

// check if the request URL is one of the auth action routes.
const isAuthActionRoute = (url?: string) =>
  !!url && AUTH_ACTION_ROUTES.some((route) => url.startsWith(route));

// interceptor that refreshes the access token once (on 401 responses) and retries the original request.
export const attachAuthInterceptor = (api: AxiosInstance) => {
    api.interceptors.response.use( (response) => response, async (error: AxiosError) => {
        // extract the original request config and the HTTP status code.
        const originalRequest = error.config as RetryConfig | undefined;
        const status = error.response?.status;

        // if there is no original request or the status is not 401, just forward the error.
        if (!originalRequest || status !== 401) {
          return Promise.reject(error);
        }
        // skip refresh for auth actions or if this request was already retried once.
        if (originalRequest._retry || isAuthActionRoute(originalRequest.url)) {
          return Promise.reject(error);
        }

        // mark this request as already retried so we don't loop.
        originalRequest._retry = true;

        try {
          // ask backend to refresh the access token, then retry the original request.
          await api.post("/auth/refresh");
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
    }
  );
};
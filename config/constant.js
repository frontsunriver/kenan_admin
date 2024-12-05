const product_mode = 1; // 1: production, 0: development

export const SERVER_URL = product_mode == 0 ? "http://192.168.144.241:8000/api" : "https://10.6.0.16:8443/api";
export const DOWNLOAD_URL = product_mode == 0 ? "http://192.168.144.241:8000/" :"https://10.6.0.16:8443/"

export const USER_INFO = "user_info";

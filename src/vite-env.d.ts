/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_BACKEND_API: string;
  readonly VITE_APP_PUSHER_KEY: string;
  readonly VITE_APP_PUSHER_SUBSCRIBE_CHANNEL: string;
  readonly VITE_APP_PUSHER_SUBSCRIBE_EVENT: string;
  readonly VITE_APP_ESEWA_URL: string;
  readonly VITE_APP_PAP_INFO: string;
  readonly VITE_APP_OPR_KEY: string;
  readonly VITE_APP_INS_KEY: string;
  readonly VITE_APP_VISA_BUNDLE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

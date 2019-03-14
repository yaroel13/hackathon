export class Path {
  public static readonly LOGIN = {
    GET_USER_DETAILS: "/web-login/sync"
  };

  public static readonly ACCOUNT_SETTINGS = {
    GET_LIST: "/host-app-setting/sync",
    SAVE_SETTINGS: "/host-app-setting/sync"
  };

  public static readonly ACCOUNT = {
    GET_LIST: "/principals"
  }

  public static readonly CHANNEL = {
    GET_LIST: "/channels"
  }

  public static readonly REGION = {
    GET_LIST: "/regions"
  }

  public static readonly ROLE = {
    GET_LIST: "/roles",
    ADD: "",
    UPDATE: ""
  }

  public static readonly STORE = {
    GET_LIST: "/stores",
    GET_DETAIL: "/stores",
    ADD: "/stores",
    UPDATE: "/stores",
    EXPORT: "/stores/export"
  }

  public static readonly TS = {
    GET_LIST: "/trade-supervisors"
  }

  public static readonly USER = {
    GET_LIST: "/users",
    GET_DETAIL: "/users",
    ADD: "/users",
    UPDATE: "/users",
    RESET_PASSWORD: "/users/reset-password",
    EXPORT: "/users/export"
  }

  public static readonly ATTENDANCE_REPORT = {
    GET_REPORT_DATA: "/report/attendance",
    EXPORT: "/report/attendance/export"
  }

  public static readonly RED_FLAG_REPORT = {
    GET_REPORT_DATA: "/report/red-flag",
    EXPORT: "/report/red-flag/export"
  }

  public static readonly RAW_DATA_REPORT = {
    GET_COUNT: "/raw-data",
    EXPORT: "/raw-data/export"
  }

}
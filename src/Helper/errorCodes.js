export const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 1001:
      return "مقدار filimo_id خالی است.";
      break;
    case 1002:
      return "سرور با خطا مواجه شده است. لطفا بعدا تلاش کنید.";
      break;
    case 1006:
      return "ارسال فیلیمو آیدی اجباری است.";
      break;
    case 1010:
      return "نام تیم به درستی وارد نشده است";
      break;
    case 1011:
      return "آواتار کد به درستی وارد نشده است";
      break;
    case 1012:
      return "شما در حال حاضر عضو یک تیم هستید";
      break;
    case 1014:
      return "ساخت تیم با مشکل مواجه شد";
      break;
    case 1020:
      return "کاربر گرامی شما عضو هیچ تیمی نیستید";
      break;
    case 1021:
      return "سازنده تیم نمی تواند آن را ترک کند.";
      break;
    case 1022:
      return "شما با موفقیت از تیم خارج شدید.";
      break;
    case 1030:
      return "کاربر گرامی شما عضو یک تیم هستید.";
      break;
    case 1031:
      return "کاربر گرامی ظرفیت این تیم تکمیل است.";
      break;
    case 1040:
      return "آیدی کاربری که می خواهید حذف شود الزامی است.";
      break;
    case 1032:
      return "خطای نامشخصی رخ داد.";
      break;
    case 1041:
      return ".شما قادر به حذف اعضای این تیم نیستید";
      break;
    case 1042:
      return "کاربر با موفقیت از تیم حذف شد.";
      break;
    case 1050:
      return "شماره موبایل ارسال نشده یا اشتباه است.";
      break;
    case 1051:
      return "شما مجاز به انجام این کار نیستید.";
      break;
    case 1052:
      return "کاربر مورد نظر از قبل عضو این تیم می باشد.";
      break;
    case 1053:
      return "شما قبلا این کاربر را دعوت کرده اید.";
      break;
    case 1060:
      return "لطفا مقدار امتیاز را وارد کنید";
      break;
    case 1061:
      return "مرحله مورد نظر وجود ندارد";
      break;
    case 1062:
      return "مرحله مورد نظر هنوز قفل است";
      break;
    case 1063:
      return "شما قبلا این مرحله را بازی کرده اید";
      break;
    case 1064:
      return "مرحله بازی نامعتبر است";
      break;
    case 1065:
      return "خطای نامشخصی رخ داد.";
      break;
    case 1070:
      return "شما این مرحله را بازی نکرده اید.";
      break;
    case 1071:
      return "شما از فرصت مجدد خود استفاده کرده اید.";
      break;
    case 2000:
      return "شما بیش از حد امتحان کرده اید. لطفا بعدا از مدتی مجددا تلاش کنید.";
      break;
    default:
      return "خطای نامشخصی رخ داد.";
  }
};

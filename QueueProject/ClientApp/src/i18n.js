import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                Create: "Create",
                Edit: "Edit",
                Delete: "Delete",
                LoadSuccess: "Loaded successfully",
                Error: "Something went wrong. Please refresh the page",
                CreateSuccess: "Created successfully",
                DeleteSuccess: "Deleted successfully",
                EditSuccess: "Edited successfully",
                RestorSuccess: "Restored successfully",
                defaultOption: "Choose an option",
                Actions: "Actions",
                ListEmpty: "List is empty",
                Yes: "Yes",
                No: "No",
                SignUp: "Sign Up",
                LogOut: "LogOut",
                Login: "Login",
                role: "Role",
                CreateBackup: "Create Backup",
                RestoreDatabase: "Restore Вatabase",

                email: "Email",
                firstname: "First name",
                lastname: "Last name",
                password: "Password",

                Home: "Home",
                Profile: "Profile",
                backups: "Backups",
                backupName: "Backup name",
                database: "Database",
                users: "Users",
                places: "Places",
                name: "Title",
                address: "Address",
                active: "Active",
                isActive: "Active",
                queuePeople: "Queue",
                created: "Date and Time",
                status: "Status",
                "Already in queue": "Already in queue",
                "Queue up": "Queue up",
                queues: "Queues",
                number: "Number",
                "Uh oh! Looks like there is an issue with your email. Please input a correct email.": "Uh oh! Looks like there is an issue with your email. Please input a correct email.",
                "That's a tasty looking email you've got there.": "That's a tasty looking email you've got there.",

                "This field is required!": "This field is required!",
                "This is not a valid email": "This is not a valid email",

                "Bad Request": "Bad Request",
                "Not Found": "Not Found",
                "User with such Email exists": "User with such Email exists",
                "Email or password is incorrect": "Email or password is incorrect",
                "One or more validation errors occurred.": "One or more validation errors occurred",
            }
        },
        ua: {
            translations: {
                Create: "Створити",
                Edit: "Редагувати",
                Delete: "Видалити",
                LoadSuccess: "Завантажено успішно",
                Error: "Щось пішло не так. Будь ласка, оновіть сторінку",
                CreateSuccess: "Створено успішно",
                DeleteSuccess: "Видалено успішно",
                EditSuccess: "Відредаговано успішно",
                RestorSuccess: "Відновлено успішно",
                defaultOption: "Виберіть варіант",
                Actions: "Дії",
                ListEmpty: "Список пустий",
                Yes: "Так",
                No: "Ні",
                SignUp: "Зареєструватись",
                LogOut: "Вийти",
                Login: "Ввійти",
                role: "Роль",
                CreateBackup: "Створити резервну копію",
                RestoreDatabase: "Відновити базу даних",

                email: "Пошта",
                firstname: "Ім'я",
                lastname: "Прізвище",
                password: "Пароль",

                Home: "Домашня сторінка",
                Profile: "Профіль",
                backups: "Бекапи",
                backupName: "Назва бекапа",
                database: "База даних",
                users: "Користувачі",
                places: "Місця",
                name: "Назва",
                address: "Адреса",
                active: "Активно",
                isActive: "Активно",
                queuePeople: "Черга",
                created: "Дата й час",
                status: "Статус",
                "Already in queue": "Вже в черзі",
                "Queue up": "Стати в чергу",
                queues: "Черги",
                number: "Номер",
                "Uh oh! Looks like there is an issue with your email. Please input a correct email.": "Ой-ой! Схоже, виникла проблема з вашою електронною поштою. Будь ласка, введіть правильний електронний лист. ",
                "That's a tasty looking email you've got there.": "Це виглядає як електронний лист, який ви ввели. ",

                "This field is required!": "Це поле необхідне!",
                "This is not a valid email": "Це не валідна пошта",

                "Bad Request": "Поганий запит",
                "Not Found": "Не знайдено",
                "User with such Email exists": "Користувач з такою електронною поштою існує",
                "Email or password is incorrect": "Електронна адреса або пароль неправильні",
                "One or more validation errors occurred.": "Сталася одна чи кілька помилок перевірки",
            }
        }
    },
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        useSuspense: false,
    }
});

export default i18n;

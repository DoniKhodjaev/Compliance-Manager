import { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Initialize translations
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Navigation
        dashboard: 'Dashboard',
        entityScreening: 'Entity Screening',
        commonEntities: 'Common Entities',
        blacklist: 'Blacklist',
        sdnList: 'SDN List',
        reports: 'Reports',
        
        // Login
        login: 'Login',
        username: 'Username',
        password: 'Password',
        enterUsername: 'Enter your username',
        enterPassword: 'Enter your password',
        loginButton: 'Login',
        invalidCredentials: 'Invalid credentials',
        searchByNameOrINN: 'Search by name or INN...',
        
        // Entity Search
        searchOrgInfo: 'Search OrgInfo',
        searchEGRUL: 'Search EGRUL',
        enterCompanyName: 'Enter company name',
        enterINN: 'Enter INN',
        search: 'Search',
        
        // Common text
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        name: 'Name',
        
        // Messages
        noResults: 'No results found',
        confirmDelete: 'Are you sure you want to delete?',
        
        // Tooltips
        logout: 'Logout',
        darkMode: 'Toggle dark mode',
        
        // BlacklistDeleteModal
        deleteConfirmation: 'Delete Confirmation',
        deleteBlacklistConfirmMessage: 'Are you sure you want to delete {{name}} from the blacklist? This action cannot be undone.',
        
        // Add these translations to each language section
        englishName: 'English Name',
        russianName: 'Russian Name',
        inn: 'INN',
        englishNames: 'English Names',
        russianNames: 'Russian Names',
        addNotesPlaceholder: 'Add notes about this entity...',
        saveChanges: 'Save Changes',
        deleteCommonlistConfirmMessage: 'Are you sure you want to delete from common list? This action cannot be undone.',
        
        
        // BlacklistModal
        editBlacklistEntry: 'Edit Blacklist Entry',
        addBlacklistEntry: 'Add Blacklist Entry',
        innOptional: 'INN (Optional)',
        fullNameEn: 'Full Name (English)',
        shortNameEn: 'Short Name (English)',
        abbreviationEn: 'Abbreviation (English)',
        fullNameRu: 'Full Name (Russian)',
        shortNameRu: 'Short Name (Russian)',
        abbreviationRu: 'Abbreviation (Russian)',
        notes: 'Notes',

        // Blacklist Manager
        internalBlacklist: 'Internal Blacklist',
        searchPlaceholder: 'Search by name, INN...',
        nameEn: 'NAME (EN)',
        nameRu: 'NAME (RU)',
        dateAdded: 'DATE ADDED',
        actions: 'ACTIONS',
        export: 'Export',
        import: 'Import',
        addEntry: 'Add Entry',
        importBlacklist: 'Import Blacklist',
        uploadFile: 'Upload File',
        downloadSample: 'Download Sample',
        dragAndDrop: 'Drag and drop your CSV file here, or',
        browse: 'browse',
        previewData: 'Preview Data',
        select: 'SELECT',
        processing: 'Processing...',
        preview: 'Preview Selected',

        // BlacklistPreviewModal
        selectCSVFile: 'Select CSV File',
        downloadSampleTemplate: 'Download Sample Template',
        rowsSelected: 'rows selected',
        fullName: 'Full Name',
        shortName: 'Short Name',
        abbreviation: 'Abbreviation',
        previewSelected: 'Preview Selected',
        enterReceiverName: 'Enter receiver name',
        enterBankName: 'Enter bank name',
        // CommonEntitiesManager
        commonEntitiesList: 'Common Entities List',
        searchEntities: 'Search entities...',
        entityName: 'ENTITY NAME',
        entityType: 'ENTITY TYPE',
        lastChecked: 'LAST CHECKED',
        searchByNameBankReference: 'Search by name, bank, reference...',
        dateRange: 'Date Range',
        amountRange: 'Amount Range',
        status: 'STATUS',
        checkCompliance: 'Check Compliance',
        removeFromCommon: 'Remove from Common Entities',
        confirmRemoveEntity: 'Are you sure you want to remove {{name}} from common entities?',
        lastCheckedOn: 'Last checked on {{date}}',
        neverChecked: 'Never checked',
        compliant: 'Compliant',
        nonCompliant: 'Non-Compliant',
        checking: 'Checking...',
        addEntity: 'Add Entity',
        checkSelected: 'Check Selected',
        entityStatus: 'Status',
        fromLastMonth: 'from last month',
        entitySource: 'Source',
        statusClean: 'Clean',
        statusNeedsReview: 'Needs Review',
        statusFlagged: 'Flagged',
        sourceOrgInfo: 'OrgInfo',
        sourceEGRUL: 'EGRUL',
        entityDetails: 'Entity Details',
        blacklistMatches: 'Blacklist Matches',
        close: 'Close',
        noNotes: 'No notes',
        enterReferenceNumber: 'Enter reference number',
        clearFilters: 'Clear Filters',
        searching: 'Searching...',
        results: 'Results',
        companyName: 'Company Name',
        founders: 'Founders',
        // CommonEntityDetailsModal translations
        source: 'Source',
        ownershipStructure: 'Ownership Structure',
        recheckOFAC: 'Recheck OFAC',
        ceo: 'CEO',
        clean: 'Clean',
        needsReview: 'Needs Review',
        flagged: 'Flagged',
        ofacMatch: 'OFAC Match',
        blacklisted: 'Blacklisted',
        clear: 'Clear',
        matchScore: '{{score}}% match',
        filters: 'Filters',
        dateFrom: 'Date From',
        dateTo: 'Date To',
        amountFrom: 'Amount From',
        referenceNumber: 'Reference',
        enterSenderName: 'Enter sender name',
        amountTo: 'Amount To',
        senderName: 'Sender Name',
        receiverName: 'Receiver Name',
        bankName: 'Bank Name',
        reference: 'Reference',
        all: 'All',
        pending: 'Pending',
        completed: 'Completed',
        failed: 'Failed',
        applyFilters: 'Apply Filters',

        // Reports translations
        analytics: 'Analytics & Reports',
        exportReport: 'Export Report',
        totalMessages: 'Total Messages',
        flaggedMessages: 'Flagged Messages',
        clearMessages: 'Clear Messages',
        statusDistribution: 'Status Distribution',
        total: 'Total',
        messageVolume: 'Message Volume',
        transactionAmount: 'Transaction Amount',
        count: 'Count',
        amount: 'Amount',
        week: 'Week',
        month: 'Month',
        year: 'Year',
        summary: 'Summary',
        averageTransactionAmount: 'Average Transaction Amount',
        flaggedRate: 'Flagged Rate',
        clearRate: 'Clear Rate',

        // SDN Details Modal translations
        sdnEntryDetails: 'SDN Entry Details',
        type: 'Type',
        nameVariations: 'Name Variations',
        programs: 'Programs',
        remarks: 'Remarks',
        addresses: 'Addresses',

        // SDN List translations
        ofacSdnList: 'OFAC SDN List',
        updating: 'Updating...',
        updateList: 'Update List',
        searchBy: 'Search by name, ID number, or program...',
        uid: 'UID',
        basicInformation: 'Basic Information',
        dateOfBirth: 'Date of Birth',
        alsoKnownAs: 'Also Known As',
        identificationDocuments: 'Identification Documents',
        showing: 'Showing {{start}} to {{end}} of {{total}} entries',
        exportSuccess: 'Successfully exported {{count}} entries',
        exportError: 'Failed to export data',

        // Theme toggle translations
        switchToLightMode: 'Switch to Light Mode',
        switchToDarkMode: 'Switch to Dark Mode',

        // Language and Logout translations
        changeLanguage: 'Change Language',
        english: 'English',
        russian: 'Russian',
        uzbek: 'Uzbek',
        logoutConfirmation: 'Are you sure you want to logout?',
        logoutConfirm: 'Yes, Logout',
        stayLoggedIn: 'Stay Logged In',
        loggingOut: 'Logging out...',
        logoutSuccess: 'Successfully logged out',
        logoutError: 'Error logging out',

        // ProtectedContent translations
        ofacCheckerInitialized: 'OFAC Checker initialized',
        failedToInitializeOfacChecker: 'Failed to initialize OFAC Checker: {{error}}',
        errorProcessingSwiftMessage: 'Error processing SWIFT message: {{error}}',
        errorDeletingMessageFromBackend: 'Error deleting message from backend: {{error}}',
        errorUpdatingStatus: 'Error updating status: {{error}}',
        addingEntityInApp: 'Adding entity: {{entity}}',
        thisEntityAlreadyExistsInCommonEntities: 'This entity already exists in Common Entities',
        entityAddedSuccessfully: 'Entity added successfully',
        errorSavingToLocalStorage: 'Error saving to localStorage: {{error}}',
        failedToSearchSdnList: 'Failed to search SDN list',
        errorCheckingEntityAgainstSdnList: 'Error checking entity {{name}} against SDN list',
        failedToCheckEntityAgainstSdnList: 'Failed to check entity against SDN list',
        failedToCheckSelectedEntities: 'Failed to check selected entities',
        errorCheckingSelectedEntities: 'Error checking selected entities: {{error}}',
        newMessage: 'New Message',

        // MessageList translations
        date: 'Date',
        sender: 'Sender',
        receiver: 'Receiver',
        viewDetails: 'View Details',
        deleteMessage: 'Delete Message',
        noMessagesFound: 'No messages found',
        allRightsReserved: 'All rights reserved.',
        madeWith: 'Made with',
        by: 'by'
      }
    },
    ru: {
      translation: {
        // Navigation
        dashboard: 'Dashboard',
        entityScreening: 'Поиск',
        commonEntities: 'Часто встречающиеся',
        blacklist: 'Черный список',
        sdnList: 'Список SDN',
        reports: 'Отчеты',
        
        // Login
        login: 'Вход',
        username: 'Имя пользователя',
        password: 'Пароль',
        enterUsername: 'Введите имя пользователя',
        enterPassword: 'Введите пароль',
        loginButton: 'Войти',
        invalidCredentials: 'Неверные учетные данные',
        
        // Entity Search
        searchOrgInfo: 'Поиск в OrgInfo',
        searchEGRUL: 'Поиск в ЕГРЮЛ',
        enterCompanyName: 'Введите название компании',
        enterINN: 'Введите ИНН',
        search: 'Поиск',
        name: 'Название',
        searchByNameOrINN: 'Поиск по названию или ИНН...',
        enterBankName: 'Введите название банка',
        // Common text
        loading: 'Загрузка...',
        error: 'Ошибка',
        success: 'Успешно',
        cancel: 'Отмена',
        save: 'Сохранить',
        delete: 'Удалить',
        edit: 'Редктировать',
        add: 'Добавить',
        searching: 'Поиск...',
        companyName: 'Название компании',
        founders: 'Учредители',
        // Messages
        noResults: 'Результаты не найдены',
        confirmDelete: 'Вы уверены, что хотите удалить?',
        
        // Tooltips
        logout: 'Выйти',
        darkMode: 'Переключить темный режим',
        
        // BlacklistDeleteModal
        deleteConfirmation: 'Подтверждение удаления',
        deleteBlacklistConfirmMessage: 'Вы уверены, что хотите удалить {{name}} из черного списка? Это действие нельзя отменить.',
        
        deleteCommonlistConfirmMessage: 'Вы уверены, что хотите удалить из общего списка? Это действие нельзя отменить.',
        enterReferenceNumber: 'Введите референс номер', 
        clearFilters: 'Очистить фильтры',

        // Add these translations to each language section
        englishName: 'Название на английском',
        russianName: 'Название на русском',
        inn: 'ИНН',
        englishNames: 'Английские названия',
        russianNames: 'Русские названия',
        addNotesPlaceholder: 'Добавьте примечания об организации...',
        saveChanges: 'Сохранить изменения',
        dateRange: 'Диапазон дат',  
        amountRange: 'Диапазон сумм',
        enterSenderName: 'Введите имя отправителя',
        // BlacklistModal
        editBlacklistEntry: 'Редактировать запись черного списка',
        addBlacklistEntry: 'Добавить запись в черный список',
        innOptional: 'ИНН (необязательно)',
        fullNameEn: 'Полное название (английский)',
        shortNameEn: 'Краткое название (английский)',
        abbreviationEn: 'Аббревиатура (английский)',
        fullNameRu: 'Полное название (русский)',
        shortNameRu: 'Краткое название (русский)',
        abbreviationRu: 'Аббревиатура (русский)',
        notes: 'Примечания',
        // Blacklist Manager
        internalBlacklist: 'Внутренний черый список',
        searchPlaceholder: 'Поиск по имени, ИНН...',
        nameEn: 'НАЗВАНИЕ (АНГ)',
        nameRu: 'НАЗВАНИЕ (РУС)',
        dateAdded: 'ДАТА Д��БАВЛЕНИЯ',
        actions: 'ДЕЙСТВИЯ',
        export: 'Экспорт',
        import: 'Импорт',
        addEntry: 'Добавить запись',
        importBlacklist: 'Импорт черного списка',
        uploadFile: 'Загрузить файл',
        downloadSample: 'Скачать пример',
        dragAndDrop: 'Перетащите CSV файл сюда или',
        browse: 'выберите',
        previewData: 'Предварительный просмотр',
        select: 'ВЫБРАТЬ',
        processing: 'Обработка...',
        preview: 'Предпросмотр выбранных',
        enterReceiverName: 'Введите имя получателя',
        // BlacklistPreviewModal
        selectCSVFile: 'Выбрать CSV файл',
        downloadSampleTemplate: 'Скачать шаблон',
        rowsSelected: 'Выбрано строк:',
        fullName: 'Полное название',
        shortName: 'Краткое название',
        abbreviation: 'Аббревиатура',
        fromLastMonth: 'За последний месяц',
        previewSelected: 'Предпросмотр выбранных',
        results: 'Результаты',
        // CommonEntitiesManager
        commonEntitiesList: 'Список общих организаций',
        searchEntities: 'Поиск организаций...',
        entityName: 'НАЗВАНИЕ',
        entityType: 'ТИП',
        lastChecked: 'ПОСЛЕДНЯЯ ПРОВЕРКА',
        status: 'СТАТУС',
        checkCompliance: 'Проверить',
        removeFromCommon: 'Удалить из общих',
        confirmRemoveEntity: 'Вы уверены, что хотите удалить {{name}} из общих организаций?',
        lastCheckedOn: 'Последняя проверк��: {{date}}',
        neverChecked: 'Не проверялось',
        compliant: 'Соответствует',
        nonCompliant: 'Не соответствует',
        checking: 'Проверка...',
        addEntity: 'Добавить',
        checkSelected: 'Проверить выбранные',
        entityStatus: 'Статус',
        entitySource: 'Источник',
        statusClean: 'Чистый',
        statusNeedsReview: 'Требует проверки',
        statusFlagged: 'Помечен',
        sourceOrgInfo: 'OrgInfo',
        sourceEGRUL: 'ЕГРЮЛ',
        entityDetails: 'Детали организации',
        blacklistMatches: 'Совпадения в черном списке',
        close: 'Закрыть',
        noNotes: 'Нет примечаний',
        // CommonEntityDetailsModal translations
        source: 'Источник',
        ownershipStructure: 'Структура собственности',
        recheckOFAC: 'Перепроверить OFAC',
        ceo: 'Директор',
        clean: 'Чистый',
        needsReview: 'Требует проверки',
        flagged: 'Помечен',
        ofacMatch: 'Совпадение OFAC',
        blacklisted: 'В черном списке',
        clear: 'Чисто',
        matchScore: 'Совпадение {{score}}%',
        filters: 'Фильтры',
        dateFrom: 'Дата с',
        dateTo: 'Дата по',
        amountFrom: 'Сумма от',
        amountTo: 'Сумма до',
        senderName: 'Отправитель',
        referenceNumber: 'Референс',
        receiverName: 'Получатель',
        bankName: 'Банк',
        reference: 'Референс',
        all: 'се',
        searchByNameBankReference: 'Поиск по названию, банку и референсу...',
        pending: 'В обработке',
        completed: 'Завершено',
        failed: 'Ошибка',
        applyFilters: 'Применить фильтры',

        // Reports translations
        analytics: 'Аналитика и отчеты',
        exportReport: 'Экспорт отчета',
        totalMessages: 'Всего сообщений',
        flaggedMessages: 'Помеченные сообщения',
        clearMessages: 'Чистые сообщения',
        statusDistribution: 'Распределение статусов',
        total: 'Всего',
        messageVolume: 'Объем сообщений',
        transactionAmount: 'Сумма транзакций',
        count: 'Количество',
        amount: 'Сумма',
        week: 'Неделя',
        month: 'Месяц',
        year: 'Год',
        summary: 'Сводка',
        averageTransactionAmount: 'Средняя сумма транзакции',
        flaggedRate: 'Процент помеченных',
        clearRate: 'Процент чистых',

        // SDN Details Modal translations
        sdnEntryDetails: 'Детали записи SDN',
        type: 'Тип',
        nameVariations: 'Варианты имени',
        programs: 'Программы',
        remarks: 'Примечания',
        addresses: 'Адреса',

        // SDN List translations
        ofacSdnList: 'Список OFAC SDN',
        updating: 'Обновление...',
        updateList: 'Обновить список',
        searchBy: 'Поиск по имени, номеру ID или программе...',
        uid: 'UID',
        basicInformation: 'Основная информация',
        dateOfBirth: 'Дата рождения',
        alsoKnownAs: 'Также известен как',
        identificationDocuments: 'Идентификационные документы',
        showing: 'Показано с {{start}} по {{end}} из {{total}} записей',
        exportSuccess: 'Успешно экспортировано {{count}} записей',
        exportError: 'Ошибка при экспорте данных',

        // Theme toggle translations
        switchToLightMode: 'Переключить на светлую тему',
        switchToDarkMode: 'Переключить на темную тему',

        // Language and Logout translations
        changeLanguage: 'Изменить язык',
        english: 'Английский',
        russian: 'Русский',
        uzbek: 'Узбекский',
        logoutConfirmation: 'Вы уверен, что хотите выйти?',
        logoutConfirm: 'Да, выйти',
        stayLoggedIn: 'Остаться в системе',
        loggingOut: 'Выход из системы...',
        logoutSuccess: 'Успешный выход из системы',
        logoutError: 'Ошибка при выходе из системы',

        // ProtectedContent translations
        ofacCheckerInitialized: 'OFAC проверка инициализирована',
        failedToInitializeOfacChecker: 'Ошибка инициализации OFAC проверки: {{error}}',
        errorProcessingSwiftMessage: 'Ошибка обработки SWIFT сообщения: {{error}}',
        errorDeletingMessageFromBackend: 'Ошибка удаления сообщения с сервера: {{error}}',
        errorUpdatingStatus: 'Ошибка обновления статуса: {{error}}',
        addingEntityInApp: 'Добавление организации: {{entity}}',
        thisEntityAlreadyExistsInCommonEntities: 'Эта организация уже существует в общем списке',
        entityAddedSuccessfully: 'Тсколит успешно добавлена',
        errorSavingToLocalStorage: 'Ошибка сохранения в localStorage: {{error}}',
        failedToSearchSdnList: 'Ошибка поиска в списке SDN',
        errorCheckingEntityAgainstSdnList: 'Ошибка проверки организации {{name}} по списку SDN',
        failedToCheckEntityAgainstSdnList: 'Не удало��ь проверить организацию по списку SDN',
        failedToCheckSelectedEntities: 'Не удалось проверить выбранные организации',
        errorCheckingSelectedEntities: 'Ошибка проверки выбранных организаций: {{error}}',
        newMessage: 'Новое сообщение',

        // MessageList translations
        date: 'Дата',
        sender: 'Отправитель',
        receiver: 'Получатель',
        viewDetails: 'Просмотр деталей',
        deleteMessage: 'Удалить сообщение',
        noMessagesFound: 'Сообщения не найдены',
        'Modern Compliance Management': 'Современная система управления соответствием',
        'Streamline your compliance workflow with automated screening, risk assessment, and real-time monitoring': 
          'Оптимизируйте процесс проверки с автоматическим скринингом, оценкой рисков и мониторингом в реальном времени',
        'Get Started': 'Начать работу',
        'Powerful Features': 'Основные возможности',
        'Risk Analysis': 'Анализ рисков',
        'Comprehensive risk assessment': 'Комплексная оценка рисков',
        'Multi-Language Support': 'Многоязычный интерфейс',
        'Support for English, Russian, and Uzbek': 'Поддержка английского, русского и узбекского языков',
        'Real-time Updates': 'Обновления в реальном времени',
        'Instant compliance status monitoring': 'Мгновенный мониторинг статуса проверки',
        'Initial Search': 'Начальный поиск',
        'Enter company details for comprehensive screening': 'Введите данные компании для комплексного скрининга',
        'EGRUL/ORGINFO': 'EGRUL/ORGINFO',
        'Official registry check and verification': 'Проверка реестра и верификация',
        'OFAC Check': 'Проверка OFAC',
        'SDN List screening and compliance verification': 'Скрининг и проверка соответствия списка SDN',
        allRightsReserved: 'Все права защищены.',
        madeWith: 'Сделано с',
        by: 'от'
      }
    },
    uz: {
      translation: {
        // Navigation
        dashboard: 'Boshqaruv paneli',
        entityScreening: 'Tashkilotlarni tekshirish',
        commonEntities: 'Umumiy tashkilotlar',
        blacklist: 'Qora roʻyxat',
        sdnList: 'SDN roʻyxati',
        reports: 'Hisobotlar',
        enterSenderName: 'Jo\'natuvchi nomini kiriting',
        enterReceiverName: 'Oluvchi nomini kiriting',
        // Login
        login: 'Kirish',
        username: 'Foydalanuvchi nomi',
        password: 'Parol',
        enterUsername: 'Foydalanuvchi nomini kiriting',
        enterPassword: 'Parolni kiriting',
        loginButton: 'Kirish',
        invalidCredentials: 'Notoʻgʻri maʼlumotlar',
        searching: 'Qidirish...',
        results: 'Natijalar',
        // Entity Search
        searchOrgInfo: 'OrgInfo qidirish',
        searchEGRUL: 'EGRUL qidirish',
        enterCompanyName: 'Kompaniya nomini kiriting',
        enterINN: 'INN kiriting',
        search: 'Qidirish',
        name: 'Nomi',
        // Common text
        loading: 'Yuklanmoqda...',
        error: 'Xato',
        success: 'Muvaffaqiyatli',
        cancel: 'Bekor qilish',
        save: 'Saqlash',
        delete: 'Oʻchirish',
        edit: 'Tahrirlash',
        add: 'Qoʻshish',
        noNotes: 'Hech qanday izohlar yoʻq',
        dateRange: 'Sanalar',
        amountRange: 'Qiymatlar',
        referenceNumber: 'Refference',
        companyName: 'Korxona nomi',
        founders: 'Uchazchilar',
        // Messages
        noResults: 'Natijalar topilmadi',
        confirmDelete: 'Rostdan ham oʻchirishni xohlaysizmi?',
        enterBankName: 'Banki nomini kiriting',
        enterReferenceNumber: 'Refference nomini kiriting',
        clearFilters: 'Filtrlarni tozalash',
        // Tooltips
        logout: 'Chiqish',
        darkMode: 'Qorong\'u rejimni almashtirish',
        
        // BlacklistDeleteModal
        deleteConfirmation: 'O\'chirish tasdiqi',
        deleteBlacklistConfirmMessage: '{{name}} ni qora ro\'yxatdan o\'chirishni xohlaysizmi? Bu amalni qaytarib bo\'lmaydi.',
        searchByNameOrINN: 'Nom yoki INN bo\'yicha qidirish...',
        // Add these translations to each language section
        englishName: 'Inglizcha nomi',
        russianName: 'Ruscha nomi',
        inn: 'INN',
        englishNames: 'Inglizcha nomlar',
        russianNames: 'Ruscha nomlar',
        addNotesPlaceholder: 'Tashkilot haqida izoh qo\'shing...',
        saveChanges: 'O\'zgarishlarni saqlash',
        
        // BlacklistModal
        editBlacklistEntry: 'Qora ro\'yxat yozuvini tahrirlash',
        addBlacklistEntry: 'Qora ro\'yxatga yozuv qo\'shish',
        innOptional: 'INN (ixtiyoriy)',
        fullNameEn: 'To\'liq nom (inglizcha)',
        shortNameEn: 'Qisqa nom (inglizcha)',
        abbreviationEn: 'Qisqartma (inglizcha)',
        fullNameRu: 'To\'liq nom (ruscha)',
        shortNameRu: 'Qisqa nom (ruscha)',
        abbreviationRu: 'Qisqartma (ruscha)',
        notes: 'Izohlar',
        deleteCommonlistConfirmMessage: 'Are you sure you want to delete from common list? This action cannot be undone.',
        
        
        // Blacklist Manager
        internalBlacklist: 'Ichki qora ro\'yxat',
        searchPlaceholder: 'Nom, INN bo\'yicha qidirish...',
        nameEn: 'NOM (ING)',
        nameRu: 'NOM (RUS)',
        dateAdded: 'QO\'SHILGAN SANA',
        actions: 'AMALLAR',
        export: 'Eksport',
        import: 'Import',
        addEntry: 'Yozuv qo\'shish',
        importBlacklist: 'Qora ro\'yxatni import qilish',
        uploadFile: 'Fayl yuklash',
        downloadSample: 'Namuna yuklash',
        dragAndDrop: 'CSV faylni shu yerga tashlang yoki',
        browse: 'tanlang',
        previewData: 'Ma\'lumotlarni ko\'rish',
        select: 'TANLASH',
        processing: 'Qayta ishlanmoqda...',
        preview: 'Tanlanganni ko\'rish',
        fromLastMonth: 'Oxirgi oy',
        // BlacklistPreviewModal
        selectCSVFile: 'CSV faylni tanlash',
        downloadSampleTemplate: 'Namuna shablonini yuklash',
        rowsSelected: 'ta qator tanlandi',
        fullName: 'To\'liq nom',
        shortName: 'Qisqa nom',
        abbreviation: 'Qisqartma',
        previewSelected: 'Tanlanganni ko\'rish',

        // CommonEntitiesManager
        commonEntitiesList: 'Umumiy tashkilotlar ro\'yxati',
        searchEntities: 'Tashkilotlarni qidirish...',
        entityName: 'TASHKILOT NOMI',
        entityType: 'TURI',
        lastChecked: 'SO\'NGI TEKSHIRUV',
        status: 'HOLATI',
        checkCompliance: 'Tekshirish',
        removeFromCommon: 'Umumiydan o\'chirish',
        confirmRemoveEntity: '{{name}} ni umumiy tashkilotlardan o\'chirishni xohlaysizmi?',
        lastCheckedOn: 'So\'nggi tekshiruv: {{date}}',
        neverChecked: 'Tekshirilmagan',
        compliant: 'Mos',
        nonCompliant: 'Mos emas',
        checking: 'Tekshirilmoqda...',
        addEntity: 'Qo\'shish',
        checkSelected: 'Tanlanganni tekshirish',
        entityStatus: 'Holati',
        entitySource: 'Manba',
        statusClean: 'Toza',
        statusNeedsReview: 'Tekshirish kerak',
        statusFlagged: 'Belgilangan',
        sourceOrgInfo: 'ORGINFO',
        sourceEGRUL: 'EGRUL',
        entityDetails: 'Tashkilot tafsilotlari',
        blacklistMatches: 'Qora ro\'yxatdagi mosliklar',
        close: 'Yopish',

        // CommonEntityDetailsModal translations
        source: 'Manba',
        ownershipStructure: 'Mulkchilik tuzilmasi',
        recheckOFAC: 'OFAC ni qayta tekshirish',
        ceo: 'Direktor',
        clean: 'Toza',
        needsReview: 'Tekshirish kerak',
        flagged: 'Belgilangan',
        ofacMatch: 'OFAC moslik',
        blacklisted: 'Qora ro\'yxatda',
        clear: 'Toza',
        matchScore: '{{score}}% moslik',
        filters: 'Filtrlar',
        dateFrom: 'Sanadan',
        dateTo: 'Sanagacha',
        amountFrom: 'Summadan',
        amountTo: 'Summagacha',
        senderName: 'Jo\'natuvchi',
        receiverName: 'Oluvchi',
        bankName: 'Bank',
        reference: 'Havola',
        all: 'Hammasi',
        pending: 'Jarayonda',
        completed: 'Bajarildi',
        failed: 'Xato',
        applyFilters: 'Filtrlarni qo\'llash',
        searchByNameBankReference: 'Nom, bank va havolaga qidirish...',

        // Reports translations
        analytics: 'Tahlil va hisobotlar',
        exportReport: 'Hisobotni eksport qilish',
        totalMessages: 'Jami xabarlar',
        flaggedMessages: 'Belgilangan xabarlar',
        clearMessages: 'Toza xabarlar',
        statusDistribution: 'Status taqsimoti',
        total: 'Jami',
        messageVolume: 'Xabarlar hajmi',
        transactionAmount: 'Tranzaksiya summasi',
        count: 'Soni',
        amount: 'Summa',
        week: 'Hafta',
        month: 'Oy',
        year: 'Yil',
        summary: 'Xulosa',
        averageTransactionAmount: 'O\'rtacha tranzaksiya summasi',
        flaggedRate: 'Belgilangan foizi',
        clearRate: 'Toza foizi',

        // SDN Details Modal translations
        sdnEntryDetails: 'SDN yozuvi tafsilotlari',
        type: 'Turi',
        nameVariations: 'Nom variantlari',
        programs: 'Dasturlar',
        remarks: 'Izohlar',
        addresses: 'Manzillar',

        // SDN List translations
        ofacSdnList: 'OFAC SDN Ro\'yxati',
        updating: 'Yangilanmoqda...',
        updateList: 'Ro\'yxatni yangilash',
        searchBy: 'Nom, ID raqami yoki dastur bo\'yicha qidirish...',
        uid: 'UID',
        basicInformation: 'Asosiy ma\'lumot',
        dateOfBirth: 'Tug\'ilgan sana',
        alsoKnownAs: 'Shuningdek tanilgan',
        identificationDocuments: 'Shaxsni tasdiqlovchi hujjatlar',
        showing: '{{total}} tadan {{start}}-{{end}} ko\'rsatilmoqda',
        exportSuccess: '{{count}} ta yozuv muvaffaqiyatli eksport qilindi',
        exportError: 'Ma\'lumotlarni eksport qilishda xatolik yuz berdi',

        // Theme toggle translations
        switchToLightMode: 'Yorug\' rejimga o\'tish',
        switchToDarkMode: 'Qorong\'u rejimga o\'tish',

        // Language and Logout translations
        changeLanguage: 'Tilni o\'zgartirish',
        english: 'Inglizcha',
        russian: 'Ruscha',
        uzbek: 'O\'zbekcha',
        logoutConfirmation: 'Tizimdan chiqishni xohlaysizmi?',
        logoutConfirm: 'Ha, chiqish',
        stayLoggedIn: 'Tizimda qolish',
        loggingOut: 'Chiqish...',
        logoutSuccess: 'Muvaffaqiyatli chiqildi',
        logoutError: 'Chiqishda xatolik yuz berdi',

        // ProtectedContent translations
        ofacCheckerInitialized: 'OFAC tekshiruvi ishga tushirildi',
        failedToInitializeOfacChecker: 'OFAC tekshiruvini ishga tushirishda xatolik: {{error}}',
        errorProcessingSwiftMessage: 'SWIFT xabarini qayta ishlashda xatolik: {{error}}',
        errorDeletingMessageFromBackend: 'Serverdan xabarni o\'chirishda xatolik: {{error}}',
        errorUpdatingStatus: 'Holatni yangilashda xatolik: {{error}}',
        addingEntityInApp: 'Tashkilot qo\'shilmoqda: {{entity}}',
        thisEntityAlreadyExistsInCommonEntities: 'Bu tashkilot allaqachon umumiy ro\'yxatda mavjud',
        entityAddedSuccessfully: 'Tashkilot muvaffaqiyatli qo\'shildi',
        errorSavingToLocalStorage: 'LocalStorage ga saqlashda xatolik: {{error}}',
        failedToSearchSdnList: 'SDN ro\'yxatidan qidirishda xatolik',
        errorCheckingEntityAgainstSdnList: '{{name}} tashkilotini SDN ro\'yxati bo\'yicha tekshirishda xatolik',
        failedToCheckEntityAgainstSdnList: 'Tashkilotni SDN ro\'yxati bo\'yicha tekshirib bo\'lmadi',
        failedToCheckSelectedEntities: 'Tanlangan tashkilotlarni tekshirib bo\'lmadi',
        errorCheckingSelectedEntities: 'Tanlangan tashkilotlarni tekshirishda xatolik: {{error}}',
        newMessage: 'Yangi xabar',

        // MessageList translations
        date: 'Sana',
        sender: 'Jo\'natuvchi',
        receiver: 'Oluvchi',
        viewDetails: 'Tafsilotlarni ko\'rish',
        deleteMessage: 'Xabarni o\'chirish',
        noMessagesFound: 'Xabarlar topilmadi',
        'Modern Compliance Management': 'Zamonaviy muvaffaqiyatli boshqarish',
        'Streamline your compliance workflow with automated screening, risk assessment, and real-time monitoring': 
          'Avtomatik tekshirish, riskni baholash va haqiqiy vaqt rejimidagi monitorlash yordamida muvaffaqiyatli boshqarish jarayoni',
        'Get Started': 'Boshlash',
        'Powerful Features': 'Kuchli xususiyatlar',
        'Risk Analysis': 'Risk tahlili',
        'Comprehensive risk assessment': 'Umumiy risk baholash',
        'Multi-Language Support': 'Ko\'p tilga tayyorlash',
        'Support for English, Russian, and Uzbek': 'Inglizcha, ruscha va o\'zbekcha tilini qo\'llash',
        'Real-time Updates': 'Haqiqiy vaqt rejimidagi yangiliklar',
        'Instant compliance status monitoring': 'Muvofaqiyatli muvaffaqiyatli boshqarish',
        'Initial Search': 'Dastlabki qidiruv',
        'Enter company details for comprehensive screening': 'Kompaniya ma\'lumotlarini kiriting',
        'EGRUL/ORGINFO': 'EGRUL/ORGINFO',
        'Official registry check and verification': 'Rasmiy reestr tekshiruvi',
        'OFAC Check': 'OFAC tekshiruvi',
        'SDN List screening and compliance verification': 'SDN ro\'yxati bo\'yicha tekshiruv',
        allRightsReserved: 'Barcha huquqlar himoyalangan.',
        madeWith: 'Ishlab chiqildi',
        by: 'tomonidan'
      }
    }
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Add effect to handle system language changes
  useEffect(() => {
    const systemLanguage = navigator.language.split('-')[0];
    const savedLanguage = localStorage.getItem('language');
    
    if (!savedLanguage && systemLanguage) {
      // If no saved preference, use system language if it's supported
      const supportedLanguages = ['en', 'ru', 'uz'];
      if (supportedLanguages.includes(systemLanguage)) {
        changeLanguage(systemLanguage);
      }
    }
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 
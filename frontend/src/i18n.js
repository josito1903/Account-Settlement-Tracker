import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/* =====================================================
   SUPPORTED LANGUAGES
===================================================== */

const SUPPORTED_LANGUAGES = [
    "en",
    "fr",
    "es",
    "pt",
    "zh",
];

/* =====================================================
   GET SAVED LANGUAGE
===================================================== */

const getSavedLanguage = () => {
    const saved = localStorage.getItem("language");

    return SUPPORTED_LANGUAGES.includes(saved) ?
        saved :
        "en";
};

/* =====================================================
   TRANSLATIONS
===================================================== */

const resources = {

    /* ===================================================
       ENGLISH
    =================================================== */

    en: {
        translation: {

            app: {
                name: "Accounts Settlement Tracker",
                welcome: "Welcome",
            },

            menu: {
                mainMenu: "MAIN MENU",
                adminMenu: "ADMIN MENU",

                dashboard: "Dashboard",
                customers: "Customers",
                vendors: "Vendors",
                invoices: "Invoices",
                payments: "Payments",
                settlements: "Settlements",
                reports: "Reports",
                users: "Users",
                profile: "Profile",
                settings: "Settings",
                logout: "Logout",
            },

            user: {
                account: "User Account",
                administrator: "Administrator",
                user: "User",
            },

            common: {
                add: "Add",
                edit: "Edit",
                delete: "Delete",
                cancel: "Cancel",
                save: "Save",
                update: "Update",
                refresh: "Refresh",
                search: "Search",
                loading: "Loading...",

                active: "Active",
                inactive: "Inactive",
                pending: "Pending",
                partial: "Partial",
                paid: "Paid",
                completed: "Completed",

                total: "Total",
                value: "Value",
                amount: "Amount",
                balance: "Balance",
                remaining: "Remaining",

                status: "Status",
                date: "Date",
                actions: "Actions",

                customer: "Customer",
                vendor: "Vendor",
                invoice: "Invoice",
                payment: "Payment",
                settlement: "Settlement",
                company: "Company",

                email: "Email",
                phone: "Phone",

                noData: "No data available",

                yes: "Yes",
                no: "No",
            },

            navbar: {
                welcome: "Welcome",
            },

            /* =================================================
               USER DASHBOARD
            ================================================= */

            dashboard: {

                eyebrow: "USER DASHBOARD",

                title: "Welcome back",

                description: "Here is a quick overview of your account, invoices, payments and settlements.",

                invoices: "My Invoices",

                payments: "My Payments",

                settlements: "My Settlements",

                outstanding: "Outstanding",

                totalInvoices: "Total invoices",

                paymentsMade: "Payments made",

                settlementRecords: "Settlement records",

                amountRemaining: "Amount remaining",

                accountDetails: "ACCOUNT DETAILS",

                information: "Your Information",

                fullName: "Full Name",

                email: "Email Address",
            },

            /* =================================================
               ADMIN DASHBOARD
            ================================================= */

            adminDashboard: {

                eyebrow: "ADMIN OVERVIEW",

                title: "Admin Dashboard",

                description: "Monitor customers, vendors, invoices, payments and settlements from one place.",

                systemActive: "System Active",

                loadingTitle: "Loading Admin Dashboard...",

                loadingDescription: "Please wait while we load your account data.",

                totalCustomers: "Total Customers",

                registeredCustomers: "Registered customers",

                totalVendors: "Total Vendors",

                registeredVendors: "Registered vendors",

                totalInvoices: "Total Invoices",

                invoicesCreated: "Invoices created",

                totalPayments: "Total Payments",

                paymentsRecorded: "Payments recorded",

                totalSettlements: "Total Settlements",

                settlementRecords: "Settlement records",

                pendingInvoices: "Pending Invoices",

                awaitingPayment: "Invoices awaiting payment",

                completedSettlements: "Completed Settlements",

                successfullyCompleted: "Successfully completed",

                businessOverview: "BUSINESS OVERVIEW",

                settlementActivity: "Settlement Activity",

                tracked: "Tracked",

                recorded: "Recorded",

                managed: "Managed",

                completed: "Completed",

                closed: "Closed",
            },

            /* =================================================
               CUSTOMERS
            ================================================= */

            customers: {

                eyebrow: "CUSTOMER MANAGEMENT",

                title: "Customers",

                description: "Manage your customers, contact details and outstanding balances.",

                records: "CUSTOMER RECORDS",

                list: "Customer List",

                totalCustomers: "Total Customers",

                activeCustomers: "Active Customers",

                outstanding: "Outstanding Balance",

                withOutstanding: "With Outstanding",

                statusTitle: "CUSTOMER STATUS",

                overview: "Account Overview",

                newCustomer: "NEW CUSTOMER",

                updateCustomer: "UPDATE CUSTOMER",

                addCustomer: "Add Customer",

                editCustomer: "Edit Customer",

                customerName: "Customer Name",

                companyName: "Company Name",

                email: "Email Address",

                phone: "Phone Number",

                address: "Address",

                balance: "Outstanding Balance",

                noCustomers: "No customers found",
            },

            /* =================================================
               VENDORS
            ================================================= */

            vendors: {

                eyebrow: "VENDOR MANAGEMENT",

                title: "Vendors",

                description: "Manage vendors, contact details and payable amounts.",

                records: "VENDOR RECORDS",

                list: "Vendor List",

                totalVendors: "Total Vendors",

                activeVendors: "Active Vendors",

                totalPayable: "Total Payable",

                withPayable: "With Payable",

                statusTitle: "VENDOR STATUS",

                overview: "Account Overview",

                newVendor: "NEW VENDOR",

                updateVendor: "UPDATE VENDOR",

                addVendor: "Add Vendor",

                editVendor: "Edit Vendor",

                vendorName: "Vendor Name",

                companyName: "Company Name",

                email: "Email Address",

                phone: "Phone Number",

                address: "Address",

                payable: "Payable Amount",

                noVendors: "No vendors found",
            },

            /* =================================================
               INVOICES
            ================================================= */

            invoices: {

                eyebrow: "FINANCIAL RECORDS",

                title: "Invoices",

                description: "Manage customer, vendor and user invoices.",

                records: "INVOICE RECORDS",

                list: "Invoice List",

                totalInvoices: "Total Invoices",

                totalValue: "Total Value",

                totalPaid: "Total Paid",

                outstanding: "Outstanding",

                paymentStatus: "PAYMENT STATUS",

                overview: "Invoice Overview",

                newInvoice: "NEW INVOICE",

                updateInvoice: "UPDATE INVOICE",

                addInvoice: "Add Invoice",

                editInvoice: "Edit Invoice",

                invoiceNumber: "Invoice Number",

                assignedUser: "Assigned User",

                invoiceDate: "Invoice Date",

                dueDate: "Due Date",

                paidAmount: "Paid Amount",

                balanceAmount: "Balance Amount",

                noInvoices: "No invoices found",

                selectUser: "Select User",

                selectCustomer: "Select Customer",

                selectVendor: "Select Vendor",

                notes: "Notes",

                notesPlaceholder: "Add notes for this invoice...",

                saving: "Saving...",

                saveInvoice: "Save Invoice",

                loading: "Loading invoices...",

                loadingDescription: "Please wait while your records are loaded.",

                createFirst: "Create your first invoice to start tracking your accounts.",

                record: "Invoice record",
            },

            /* =================================================
               PAYMENTS
            ================================================= */

            payments: {

                eyebrow: "FINANCIAL RECORDS",

                title: "Payments",

                description: "Record, monitor and manage payments against invoices.",

                management: "PAYMENT MANAGEMENT",

                addPayment: "Add Payment",

                totalPayments: "Total Payments",

                totalAmount: "Total Amount",

                totalPaid: "Total Paid",

                recordedTransactions: "Recorded transactions",

                totalReceived: "Total amount received",

                availableInvoices: "Available invoices",

                paymentHistory: "Payment History",

                records: "PAYMENT RECORDS",

                updatePayment: "UPDATE PAYMENT",

                newPayment: "NEW PAYMENT",

                editPayment: "Edit Payment",

                recordPayment: "Record Payment",

                selectInvoice: "Select Invoice",

                balance: "balance",

                paymentAmount: "Payment Amount",

                amountPlaceholder: "Enter payment amount",

                paymentMethod: "Payment Method",

                paymentDate: "Payment Date",

                transactionId: "Transaction ID",

                transactionPlaceholder: "Enter transaction ID",

                remarks: "Remarks",

                remarksPlaceholder: "Add payment remarks",

                saving: "Saving...",

                savePayment: "Save Payment",

                loading: "Loading payments...",

                loadingDescription: "Please wait while payment records are loaded.",

                noPayments: "No payments found",

                firstPayment: "Record your first payment to get started.",

                methods: {

                    cash: "Cash",

                    bankTransfer: "Bank Transfer",

                    upi: "UPI",

                    cheque: "Cheque",
                },
            },

            /* =================================================
               SETTLEMENTS
            ================================================= */

            settlements: {

                eyebrow: "FINANCIAL RECORDS",

                title: "Settlements",

                description: "Track the settlement progress of your invoices and payments.",

                history: "SETTLEMENT HISTORY",

                list: "Settlement List",

                totalSettlements: "Total Settlements",

                totalValue: "Total Value",

                completed: "Completed",

                remaining: "Remaining",

                paid: "Paid",

                noSettlements: "No settlements found",

                management: "SETTLEMENT MANAGEMENT",

                addSettlement: "Add Settlement",

                newSettlement: "NEW SETTLEMENT",

                updateSettlement: "UPDATE SETTLEMENT",

                editSettlement: "Edit Settlement",

                selectInvoice: "Select Invoice",

                settlementDate: "Settlement Date",

                remarks: "Remarks",

                remarksPlaceholder: "Add settlement remarks",

                saveSettlement: "Save Settlement",

                saving: "Saving...",

                records: "SETTLEMENT RECORDS",

                loading: "Loading settlements...",

                loadingDescription: "Please wait while settlement records are loaded.",

                firstSettlement: "Create your first settlement record to get started.",
            },

            /* =================================================
               REPORTS
            ================================================= */

            reports: {

                eyebrow: "REPORTING",

                title: "Reports",

                description: "Financial and settlement reports for the Accounts Settlement Tracker.",

                revenue: "Revenue Report",

                customers: "Customer Outstanding Report",

                vendors: "Vendor Payables Report",

                settlements: "Settlement Summary",

                year: "Year",

                month: "Month",
            },

            /* =================================================
               USERS
            ================================================= */

            users: {

                eyebrow: "USER MANAGEMENT",

                title: "User Management",

                description: "Manage registered users and their access roles.",

                registered: "Registered Users",

                name: "Name",

                email: "Email",

                phone: "Phone",

                role: "Role",

                status: "Status",

                actions: "Actions",

                user: "User",

                admin: "Admin",

                editUser: "Edit User",

                saveChanges: "Save Changes",

                activeAccount: "Active Account",

                noUsers: "No users found",

                loadingUsers: "Loading users...",
            },

            /* =================================================
               PROFILE
            ================================================= */

            profile: {

                eyebrow: "MY ACCOUNT",

                title: "Profile",

                description: "View your account information.",

                accountInformation: "ACCOUNT INFORMATION",

                personalInformation: "Personal Information",

                accountStatus: "Account Status",

                memberSince: "Member Since",

                notProvided: "Not provided",

                loading: "Loading profile...",

                loadingDescription: "Please wait while your account information is loaded.",

                account: "Account",
            },

            /* =================================================
               SETTINGS
            ================================================= */

            settings: {

                preferences: "ACCOUNT PREFERENCES",

                title: "Settings",

                description: "Manage your account preferences, notifications and application appearance.",

                language: "Language",

                languageDescription: "Choose the language for the application.",

                appearance: "Appearance",

                appearanceDescription: "Choose how Accounts Settlement Tracker looks.",

                notifications: "Notifications",

                security: "Security",

                light: "Light",

                dark: "Dark",

                system: "System",

                lightDescription: "Use the light application theme.",

                darkDescription: "Use the dark application theme.",

                systemDescription: "Follow your device appearance.",

                lightModeSelected: "Light mode is currently selected.",

                darkModeSelected: "Dark mode is currently selected.",

                systemModeSelected: "System mode follows your device appearance.",

                english: "English",

                french: "French",

                spanish: "Spanish",

                portuguese: "Portuguese",

                mandarin: "Mandarin",

                saveSettings: "Save Settings",
            },

            /* =================================================
               SECURITY
            ================================================= */

            security: {

                account: "Account Security",

                accountDescription: "Your account is protected by authenticated access.",

                description: "Manage your account access and security.",

                password: "Password",

                passwordDescription: "Update your account password.",

                changePassword: "Change Password",

                signOut: "Sign out",

                signOutDescription: "Log out of your current session.",

                secure: "Secure",

                currentPassword: "Current Password",

                newPassword: "New Password",

                confirmPassword: "Confirm New Password",

                passwordUpdated: "Password change is ready for backend integration.",

                passwordModalDescription: "Update your account password using the form below.",

                currentPasswordPlaceholder: "Enter current password",

                newPasswordPlaceholder: "Enter new password",

                confirmPasswordPlaceholder: "Confirm new password",

                updatePassword: "Update Password",
            },

            /* =================================================
               NOTIFICATIONS
            ================================================= */

            notifications: {

                chooseUpdates: "Choose what updates you want to receive.",

                email: "Email Notifications",

                emailDescription: "Receive important account updates by email.",

                payment: "Payment Notifications",

                paymentDescription: "Get notified when payment records change.",

                settlement: "Settlement Notifications",

                settlementDescription: "Receive updates about settlement progress.",
            },

            /* =================================================
               MESSAGES
            ================================================= */

            messages: {

                settingsSaved: "Settings saved successfully.",

                languageUpdated: "Language updated successfully.",

                dashboardLoadError: "Failed to load dashboard data.",

                profileLoadError: "Failed to load profile.",

                paymentLoadError: "Failed to load payment data.",

                paymentInvoiceRequired: "Please select an invoice.",

                paymentAmountRequired: "Payment amount must be greater than zero.",

                paymentSaveError: "Failed to save payment.",

                deletePayment: "Are you sure you want to delete this payment?",

                paymentDeleteError: "Failed to delete payment.",

                invoiceLoadError: "Failed to load invoice data.",

                invoiceRequiredFields: "Please select a user, customer and vendor.",

                invoiceAmountRequired: "Total amount must be greater than zero.",

                invoicePaidTooHigh: "Paid amount cannot be greater than total amount.",

                invoiceSaveError: "Failed to save invoice.",

                deleteInvoice: "Are you sure you want to delete this invoice?",

                invoiceDeleteError: "Failed to delete invoice.",

                addFirstCustomer: "Add your first customer to get started.",

                confirmLogout: "Are you sure you want to log out of this account?",

                currentPasswordRequired: "Please enter your current password.",

                newPasswordRequired: "Please enter a new password.",

                passwordMinLength: "New password must contain at least 6 characters.",

                passwordMismatch: "New passwords do not match.",

                loadingCustomers: "Please wait while customer records are loaded.",

                loadingVendors: "Please wait while vendor records are loaded.",

                deleteCustomer: "Are you sure you want to delete this customer?",

                deleteVendor: "Are you sure you want to delete this vendor?",

                deleteUser: "Are you sure you want to delete this user.",
            },
        },
    },

    /* ===================================================
       FRENCH
    =================================================== */

    fr: {
        translation: {

            app: {
                name: "Suivi des règlements des comptes",
                welcome: "Bienvenue",
            },

            menu: {
                mainMenu: "MENU PRINCIPAL",
                adminMenu: "MENU ADMINISTRATEUR",
                dashboard: "Tableau de bord",
                customers: "Clients",
                vendors: "Fournisseurs",
                invoices: "Factures",
                payments: "Paiements",
                settlements: "Règlements",
                reports: "Rapports",
                users: "Utilisateurs",
                profile: "Profil",
                settings: "Paramètres",
                logout: "Déconnexion",
            },

            user: {
                account: "Compte utilisateur",
                administrator: "Administrateur",
                user: "Utilisateur",
            },

            common: {
                add: "Ajouter",
                edit: "Modifier",
                delete: "Supprimer",
                cancel: "Annuler",
                save: "Enregistrer",
                update: "Mettre à jour",
                refresh: "Actualiser",
                search: "Rechercher",
                loading: "Chargement...",
                active: "Actif",
                inactive: "Inactif",
                pending: "En attente",
                partial: "Partiel",
                paid: "Payé",
                completed: "Terminé",
                total: "Total",
                value: "Valeur",
                amount: "Montant",
                balance: "Solde",
                remaining: "Restant",
                status: "Statut",
                date: "Date",
                actions: "Actions",
                customer: "Client",
                vendor: "Fournisseur",
                invoice: "Facture",
                payment: "Paiement",
                settlement: "Règlement",
                company: "Entreprise",
                email: "E-mail",
                phone: "Téléphone",
                noData: "Aucune donnée disponible",
                yes: "Oui",
                no: "Non",
            },

            navbar: {
                welcome: "Bienvenue",
            },

            dashboard: {
                eyebrow: "TABLEAU DE BORD UTILISATEUR",
                title: "Bon retour",
                description: "Voici un aperçu rapide de votre compte, de vos factures, paiements et règlements.",
                invoices: "Mes factures",
                payments: "Mes paiements",
                settlements: "Mes règlements",
                outstanding: "Solde restant",
                totalInvoices: "Total des factures",
                paymentsMade: "Paiements effectués",
                settlementRecords: "Enregistrements des règlements",
                amountRemaining: "Montant restant",
                accountDetails: "DÉTAILS DU COMPTE",
                information: "Vos informations",
                fullName: "Nom complet",
                email: "Adresse e-mail",
            },

            adminDashboard: {
                eyebrow: "APERÇU ADMINISTRATEUR",
                title: "Tableau de bord administrateur",
                description: "Surveillez les clients, fournisseurs, factures, paiements et règlements depuis un seul endroit.",
                systemActive: "Système actif",
                loadingTitle: "Chargement du tableau de bord administrateur...",
                loadingDescription: "Veuillez patienter pendant le chargement des données de votre compte.",
                totalCustomers: "Total des clients",
                registeredCustomers: "Clients enregistrés",
                totalVendors: "Total des fournisseurs",
                registeredVendors: "Fournisseurs enregistrés",
                totalInvoices: "Total des factures",
                invoicesCreated: "Factures créées",
                totalPayments: "Total des paiements",
                paymentsRecorded: "Paiements enregistrés",
                totalSettlements: "Total des règlements",
                settlementRecords: "Enregistrements des règlements",
                pendingInvoices: "Factures en attente",
                awaitingPayment: "Factures en attente de paiement",
                completedSettlements: "Règlements terminés",
                successfullyCompleted: "Terminés avec succès",
                businessOverview: "APERÇU DE L'ACTIVITÉ",
                settlementActivity: "Activité des règlements",
                tracked: "Suivies",
                recorded: "Enregistrés",
                managed: "Gérés",
                completed: "Terminés",
                closed: "Clôturés",
            },

            customers: {
                eyebrow: "GESTION DES CLIENTS",
                title: "Clients",
                description: "Gérez vos clients, leurs coordonnées et leurs soldes impayés.",
                records: "DOSSIERS CLIENTS",
                list: "Liste des clients",
                totalCustomers: "Total des clients",
                activeCustomers: "Clients actifs",
                outstanding: "Solde impayé",
                withOutstanding: "Avec solde impayé",
                statusTitle: "STATUT DES CLIENTS",
                overview: "Vue d'ensemble",
                newCustomer: "NOUVEAU CLIENT",
                updateCustomer: "MODIFIER LE CLIENT",
                addCustomer: "Ajouter un client",
                editCustomer: "Modifier le client",
                customerName: "Nom du client",
                companyName: "Nom de l'entreprise",
                email: "Adresse e-mail",
                phone: "Numéro de téléphone",
                address: "Adresse",
                balance: "Solde impayé",
                noCustomers: "Aucun client trouvé",
            },

            vendors: {
                eyebrow: "GESTION DES FOURNISSEURS",
                title: "Fournisseurs",
                description: "Gérez les fournisseurs, leurs coordonnées et les montants à payer.",
                records: "DOSSIERS FOURNISSEURS",
                list: "Liste des fournisseurs",
                totalVendors: "Total des fournisseurs",
                activeVendors: "Fournisseurs actifs",
                totalPayable: "Total à payer",
                withPayable: "Avec montant à payer",
                statusTitle: "STATUT DES FOURNISSEURS",
                overview: "Vue d'ensemble",
                newVendor: "NOUVEAU FOURNISSEUR",
                updateVendor: "MODIFIER LE FOURNISSEUR",
                addVendor: "Ajouter un fournisseur",
                editVendor: "Modifier le fournisseur",
                vendorName: "Nom du fournisseur",
                companyName: "Nom de l'entreprise",
                email: "Adresse e-mail",
                phone: "Numéro de téléphone",
                address: "Adresse",
                payable: "Montant à payer",
                noVendors: "Aucun fournisseur trouvé",
            },

            invoices: {
                eyebrow: "DOSSIERS FINANCIERS",
                title: "Factures",
                description: "Gérez les factures des clients, fournisseurs et utilisateurs.",
                records: "DOSSIERS DE FACTURES",
                list: "Liste des factures",
                totalInvoices: "Total des factures",
                totalValue: "Valeur totale",
                totalPaid: "Total payé",
                outstanding: "Impayé",
                paymentStatus: "STATUT DES PAIEMENTS",
                overview: "Vue des factures",
                newInvoice: "NOUVELLE FACTURE",
                updateInvoice: "MODIFIER LA FACTURE",
                addInvoice: "Ajouter une facture",
                editInvoice: "Modifier la facture",
                invoiceNumber: "Numéro de facture",
                assignedUser: "Utilisateur assigné",
                invoiceDate: "Date de facture",
                dueDate: "Date d'échéance",
                paidAmount: "Montant payé",
                balanceAmount: "Montant restant",
                noInvoices: "Aucune facture trouvée",
                selectUser: "Sélectionner un utilisateur",
                selectCustomer: "Sélectionner un client",
                selectVendor: "Sélectionner un fournisseur",
                notes: "Notes",
                notesPlaceholder: "Ajoutez des notes pour cette facture...",
                saving: "Enregistrement...",
                saveInvoice: "Enregistrer la facture",
                loading: "Chargement des factures...",
                loadingDescription: "Veuillez patienter pendant le chargement de vos dossiers.",
                createFirst: "Créez votre première facture pour commencer le suivi de vos comptes.",
                record: "Dossier de facture",
            },

            payments: {
                eyebrow: "DOSSIERS FINANCIERS",
                title: "Paiements",
                description: "Enregistrez, suivez et gérez les paiements associés aux factures.",
                management: "GESTION DES PAIEMENTS",
                addPayment: "Ajouter un paiement",
                totalPayments: "Total des paiements",
                totalAmount: "Montant total",
                totalPaid: "Total payé",
                recordedTransactions: "Transactions enregistrées",
                totalReceived: "Montant total reçu",
                availableInvoices: "Factures disponibles",
                paymentHistory: "Historique des paiements",
                records: "DOSSIERS DE PAIEMENT",
                updatePayment: "MODIFIER LE PAIEMENT",
                newPayment: "NOUVEAU PAIEMENT",
                editPayment: "Modifier le paiement",
                recordPayment: "Enregistrer le paiement",
                selectInvoice: "Sélectionner une facture",
                balance: "solde",
                paymentAmount: "Montant du paiement",
                amountPlaceholder: "Saisissez le montant du paiement",
                paymentMethod: "Mode de paiement",
                paymentDate: "Date du paiement",
                transactionId: "ID de transaction",
                transactionPlaceholder: "Saisissez l'ID de transaction",
                remarks: "Remarques",
                remarksPlaceholder: "Ajoutez des remarques",
                saving: "Enregistrement...",
                savePayment: "Enregistrer le paiement",
                loading: "Chargement des paiements...",
                loadingDescription: "Veuillez patienter pendant le chargement des paiements.",
                noPayments: "Aucun paiement trouvé",
                firstPayment: "Enregistrez votre premier paiement pour commencer.",
                methods: {
                    cash: "Espèces",
                    bankTransfer: "Virement bancaire",
                    upi: "UPI",
                    cheque: "Chèque",
                },
            },

            settlements: {
                eyebrow: "DOSSIERS FINANCIERS",
                title: "Règlements",
                description: "Suivez l'avancement des règlements de vos factures et paiements.",
                history: "HISTORIQUE DES RÈGLEMENTS",
                list: "Liste des règlements",
                totalSettlements: "Total des règlements",
                totalValue: "Valeur totale",
                completed: "Terminés",
                remaining: "Restant",
                paid: "Payé",
                noSettlements: "Aucun règlement trouvé",
                management: "GESTION DES RÈGLEMENTS",
                addSettlement: "Ajouter un règlement",
                newSettlement: "NOUVEAU RÈGLEMENT",
                updateSettlement: "MODIFIER LE RÈGLEMENT",
                editSettlement: "Modifier le règlement",
                selectInvoice: "Sélectionner une facture",
                settlementDate: "Date du règlement",
                remarks: "Remarques",
                remarksPlaceholder: "Ajoutez des remarques",
                saveSettlement: "Enregistrer le règlement",
                saving: "Enregistrement...",
                records: "DOSSIERS DE RÈGLEMENT",
                loading: "Chargement des règlements...",
                loadingDescription: "Veuillez patienter pendant le chargement des règlements.",
                firstSettlement: "Créez votre premier règlement pour commencer.",
            },

            reports: {
                eyebrow: "RAPPORTS",
                title: "Rapports",
                description: "Rapports financiers et de règlement pour le système de suivi des comptes.",
                revenue: "Rapport des revenus",
                customers: "Rapport des soldes clients",
                vendors: "Rapport des dettes fournisseurs",
                settlements: "Résumé des règlements",
                year: "Année",
                month: "Mois",
            },

            users: {
                eyebrow: "GESTION DES UTILISATEURS",
                title: "Gestion des utilisateurs",
                description: "Gérez les utilisateurs enregistrés et leurs rôles d'accès.",
                registered: "Utilisateurs enregistrés",
                name: "Nom",
                email: "E-mail",
                phone: "Téléphone",
                role: "Rôle",
                status: "Statut",
                actions: "Actions",
                user: "Utilisateur",
                admin: "Administrateur",
                editUser: "Modifier l'utilisateur",
                saveChanges: "Enregistrer les modifications",
                activeAccount: "Compte actif",
                noUsers: "Aucun utilisateur trouvé",
                loadingUsers: "Chargement des utilisateurs...",
            },

            profile: {
                eyebrow: "MON COMPTE",
                title: "Profil",
                description: "Consultez les informations de votre compte.",
                accountInformation: "INFORMATIONS DU COMPTE",
                personalInformation: "Informations personnelles",
                accountStatus: "Statut du compte",
                memberSince: "Membre depuis",
                notProvided: "Non fourni",
                loading: "Chargement du profil...",
                loadingDescription: "Veuillez patienter pendant le chargement des informations de votre compte.",
                account: "Compte",
            },

            settings: {
                preferences: "PRÉFÉRENCES DU COMPTE",
                title: "Paramètres",
                description: "Gérez les préférences de votre compte, les notifications et l'apparence de l'application.",
                language: "Langue",
                languageDescription: "Choisissez la langue de l'application.",
                appearance: "Apparence",
                appearanceDescription: "Choisissez l'apparence de l'application.",
                notifications: "Notifications",
                security: "Sécurité",
                light: "Clair",
                dark: "Sombre",
                system: "Système",
                lightDescription: "Utiliser le thème clair.",
                darkDescription: "Utiliser le thème sombre.",
                systemDescription: "Suivre l'apparence de votre appareil.",
                lightModeSelected: "Le mode clair est actuellement sélectionné.",
                darkModeSelected: "Le mode sombre est actuellement sélectionné.",
                systemModeSelected: "Le mode système suit l'apparence de votre appareil.",
                english: "Anglais",
                french: "Français",
                spanish: "Espagnol",
                portuguese: "Portugais",
                mandarin: "Mandarin",
                saveSettings: "Enregistrer les paramètres",
            },

            security: {
                account: "Sécurité du compte",
                accountDescription: "Votre compte est protégé par un accès authentifié.",
                description: "Gérez l'accès et la sécurité de votre compte.",
                password: "Mot de passe",
                passwordDescription: "Mettez à jour le mot de passe de votre compte.",
                changePassword: "Modifier le mot de passe",
                signOut: "Déconnexion",
                signOutDescription: "Déconnectez-vous de votre session actuelle.",
                secure: "Sécurisé",
                currentPassword: "Mot de passe actuel",
                newPassword: "Nouveau mot de passe",
                confirmPassword: "Confirmer le nouveau mot de passe",
                passwordUpdated: "La modification du mot de passe est prête pour l'intégration du backend.",
                passwordModalDescription: "Mettez à jour le mot de passe de votre compte à l'aide du formulaire ci-dessous.",
                currentPasswordPlaceholder: "Saisissez le mot de passe actuel",
                newPasswordPlaceholder: "Saisissez le nouveau mot de passe",
                confirmPasswordPlaceholder: "Confirmez le nouveau mot de passe",
                updatePassword: "Mettre à jour le mot de passe",
            },

            notifications: {
                chooseUpdates: "Choisissez les mises à jour que vous souhaitez recevoir.",
                email: "Notifications par e-mail",
                emailDescription: "Recevez les mises à jour importantes du compte par e-mail.",
                payment: "Notifications de paiement",
                paymentDescription: "Soyez informé lorsque les paiements sont modifiés.",
                settlement: "Notifications de règlement",
                settlementDescription: "Recevez des mises à jour sur les règlements.",
            },

            messages: {
                settingsSaved: "Paramètres enregistrés avec succès.",
                languageUpdated: "Langue mise à jour avec succès.",
                dashboardLoadError: "Impossible de charger les données du tableau de bord.",
                profileLoadError: "Impossible de charger le profil.",
                paymentLoadError: "Impossible de charger les données de paiement.",
                paymentInvoiceRequired: "Veuillez sélectionner une facture.",
                paymentAmountRequired: "Le montant du paiement doit être supérieur à zéro.",
                paymentSaveError: "Impossible d'enregistrer le paiement.",
                deletePayment: "Voulez-vous vraiment supprimer ce paiement ?",
                paymentDeleteError: "Impossible de supprimer le paiement.",
                invoiceLoadError: "Impossible de charger les données de facture.",
                invoiceRequiredFields: "Veuillez sélectionner un utilisateur, un client et un fournisseur.",
                invoiceAmountRequired: "Le montant total doit être supérieur à zéro.",
                invoicePaidTooHigh: "Le montant payé ne peut pas être supérieur au montant total.",
                invoiceSaveError: "Impossible d'enregistrer la facture.",
                deleteInvoice: "Voulez-vous vraiment supprimer cette facture ?",
                invoiceDeleteError: "Impossible de supprimer la facture.",
                addFirstCustomer: "Ajoutez votre premier client pour commencer.",
                confirmLogout: "Voulez-vous vraiment vous déconnecter de ce compte ?",
                currentPasswordRequired: "Veuillez saisir votre mot de passe actuel.",
                newPasswordRequired: "Veuillez saisir un nouveau mot de passe.",
                passwordMinLength: "Le nouveau mot de passe doit contenir au moins 6 caractères.",
                passwordMismatch: "Les nouveaux mots de passe ne correspondent pas.",
                loadingCustomers: "Veuillez patienter pendant le chargement des dossiers clients.",
                loadingVendors: "Veuillez patienter pendant le chargement des dossiers fournisseurs.",
                deleteCustomer: "Voulez-vous vraiment supprimer ce client ?",
                deleteVendor: "Voulez-vous vraiment supprimer ce fournisseur ?",
                deleteUser: "Voulez-vous vraiment supprimer cet utilisateur ?",
            },
        },
    },

    /* ===================================================
       SPANISH
    =================================================== */

    es: {
        translation: {

            app: {
                name: "Gestor de Liquidación de Cuentas",
                welcome: "Bienvenido",
            },

            menu: {
                mainMenu: "MENÚ PRINCIPAL",
                adminMenu: "MENÚ DE ADMINISTRACIÓN",
                dashboard: "Panel",
                customers: "Clientes",
                vendors: "Proveedores",
                invoices: "Facturas",
                payments: "Pagos",
                settlements: "Liquidaciones",
                reports: "Informes",
                users: "Usuarios",
                profile: "Perfil",
                settings: "Configuración",
                logout: "Cerrar sesión",
            },

            user: {
                account: "Cuenta de usuario",
                administrator: "Administrador",
                user: "Usuario",
            },

            common: {
                add: "Añadir",
                edit: "Editar",
                delete: "Eliminar",
                cancel: "Cancelar",
                save: "Guardar",
                update: "Actualizar",
                refresh: "Actualizar",
                search: "Buscar",
                loading: "Cargando...",
                active: "Activo",
                inactive: "Inactivo",
                pending: "Pendiente",
                partial: "Parcial",
                paid: "Pagado",
                completed: "Completado",
                total: "Total",
                value: "Valor",
                amount: "Importe",
                balance: "Saldo",
                remaining: "Restante",
                status: "Estado",
                date: "Fecha",
                actions: "Acciones",
                customer: "Cliente",
                vendor: "Proveedor",
                invoice: "Factura",
                payment: "Pago",
                settlement: "Liquidación",
                company: "Empresa",
                email: "Correo electrónico",
                phone: "Teléfono",
                noData: "No hay datos disponibles",
                yes: "Sí",
                no: "No",
            },

            navbar: {
                welcome: "Bienvenido",
            },

            dashboard: {
                eyebrow: "PANEL DEL USUARIO",
                title: "Bienvenido de nuevo",
                description: "Aquí tienes un resumen de tu cuenta, facturas, pagos y liquidaciones.",
                invoices: "Mis facturas",
                payments: "Mis pagos",
                settlements: "Mis liquidaciones",
                outstanding: "Pendiente",
                totalInvoices: "Total de facturas",
                paymentsMade: "Pagos realizados",
                settlementRecords: "Registros de liquidaciones",
                amountRemaining: "Importe restante",
                accountDetails: "DETALLES DE LA CUENTA",
                information: "Tu información",
                fullName: "Nombre completo",
                email: "Correo electrónico",
            },

            adminDashboard: {
                eyebrow: "VISIÓN GENERAL DEL ADMINISTRADOR",
                title: "Panel del Administrador",
                description: "Supervisa clientes, proveedores, facturas, pagos y liquidaciones desde un solo lugar.",
                systemActive: "Sistema activo",
                loadingTitle: "Cargando panel del administrador...",
                loadingDescription: "Espera mientras cargamos los datos de tu cuenta.",
                totalCustomers: "Total de clientes",
                registeredCustomers: "Clientes registrados",
                totalVendors: "Total de proveedores",
                registeredVendors: "Proveedores registrados",
                totalInvoices: "Total de facturas",
                invoicesCreated: "Facturas creadas",
                totalPayments: "Total de pagos",
                paymentsRecorded: "Pagos registrados",
                totalSettlements: "Total de liquidaciones",
                settlementRecords: "Registros de liquidaciones",
                pendingInvoices: "Facturas pendientes",
                awaitingPayment: "Facturas pendientes de pago",
                completedSettlements: "Liquidaciones completadas",
                successfullyCompleted: "Completadas correctamente",
                businessOverview: "VISIÓN GENERAL DEL NEGOCIO",
                settlementActivity: "Actividad de liquidaciones",
                tracked: "Supervisadas",
                recorded: "Registrados",
                managed: "Gestionadas",
                completed: "Completadas",
                closed: "Cerradas",
            },

            customers: {
                eyebrow: "GESTIÓN DE CLIENTES",
                title: "Clientes",
                description: "Gestiona tus clientes, datos de contacto y saldos pendientes.",
                records: "REGISTROS DE CLIENTES",
                list: "Lista de clientes",
                totalCustomers: "Total de clientes",
                activeCustomers: "Clientes activos",
                outstanding: "Saldo pendiente",
                withOutstanding: "Con saldo pendiente",
                statusTitle: "ESTADO DE LOS CLIENTES",
                overview: "Resumen",
                newCustomer: "NUEVO CLIENTE",
                updateCustomer: "ACTUALIZAR CLIENTE",
                addCustomer: "Añadir cliente",
                editCustomer: "Editar cliente",
                customerName: "Nombre del cliente",
                companyName: "Nombre de la empresa",
                email: "Correo electrónico",
                phone: "Número de teléfono",
                address: "Dirección",
                balance: "Saldo pendiente",
                noCustomers: "No se encontraron clientes",
            },

            vendors: {
                eyebrow: "GESTIÓN DE PROVEEDORES",
                title: "Proveedores",
                description: "Gestiona proveedores, datos de contacto e importes por pagar.",
                records: "REGISTROS DE PROVEEDORES",
                list: "Lista de proveedores",
                totalVendors: "Total de proveedores",
                activeVendors: "Proveedores activos",
                totalPayable: "Total por pagar",
                withPayable: "Con importe por pagar",
                statusTitle: "ESTADO DE LOS PROVEEDORES",
                overview: "Resumen",
                newVendor: "NUEVO PROVEEDOR",
                updateVendor: "ACTUALIZAR PROVEEDOR",
                addVendor: "Añadir proveedor",
                editVendor: "Editar proveedor",
                vendorName: "Nombre del proveedor",
                companyName: "Nombre de la empresa",
                email: "Correo electrónico",
                phone: "Número de teléfono",
                address: "Dirección",
                payable: "Importe por pagar",
                noVendors: "No se encontraron proveedores",
            },

            invoices: {
                eyebrow: "REGISTROS FINANCIEROS",
                title: "Facturas",
                description: "Gestiona las facturas de clientes, proveedores y usuarios.",
                records: "REGISTROS DE FACTURAS",
                list: "Lista de facturas",
                totalInvoices: "Total de facturas",
                totalValue: "Valor total",
                totalPaid: "Total pagado",
                outstanding: "Pendiente",
                paymentStatus: "ESTADO DE LOS PAGOS",
                overview: "Resumen de facturas",
                newInvoice: "NUEVA FACTURA",
                updateInvoice: "ACTUALIZAR FACTURA",
                addInvoice: "Añadir factura",
                editInvoice: "Editar factura",
                invoiceNumber: "Número de factura",
                assignedUser: "Usuario asignado",
                invoiceDate: "Fecha de factura",
                dueDate: "Fecha de vencimiento",
                paidAmount: "Importe pagado",
                balanceAmount: "Importe restante",
                noInvoices: "No se encontraron facturas",
                selectUser: "Seleccionar usuario",
                selectCustomer: "Seleccionar cliente",
                selectVendor: "Seleccionar proveedor",
                notes: "Notas",
                notesPlaceholder: "Añade notas para esta factura...",
                saving: "Guardando...",
                saveInvoice: "Guardar factura",
                loading: "Cargando facturas...",
                loadingDescription: "Espera mientras se cargan tus registros.",
                createFirst: "Crea tu primera factura para empezar a controlar tus cuentas.",
                record: "Registro de factura",
            },

            payments: {
                eyebrow: "REGISTROS FINANCIEROS",
                title: "Pagos",
                description: "Registra, supervisa y gestiona los pagos asociados a las facturas.",
                management: "GESTIÓN DE PAGOS",
                addPayment: "Añadir pago",
                totalPayments: "Total de pagos",
                totalAmount: "Importe total",
                totalPaid: "Total pagado",
                recordedTransactions: "Transacciones registradas",
                totalReceived: "Importe total recibido",
                availableInvoices: "Facturas disponibles",
                paymentHistory: "Historial de pagos",
                records: "REGISTROS DE PAGOS",
                updatePayment: "ACTUALIZAR PAGO",
                newPayment: "NUEVO PAGO",
                editPayment: "Editar pago",
                recordPayment: "Registrar pago",
                selectInvoice: "Seleccionar factura",
                balance: "saldo",
                paymentAmount: "Importe del pago",
                amountPlaceholder: "Introduce el importe del pago",
                paymentMethod: "Método de pago",
                paymentDate: "Fecha del pago",
                transactionId: "ID de transacción",
                transactionPlaceholder: "Introduce el ID de transacción",
                remarks: "Observaciones",
                remarksPlaceholder: "Añade observaciones del pago",
                saving: "Guardando...",
                savePayment: "Guardar pago",
                loading: "Cargando pagos...",
                loadingDescription: "Espera mientras se cargan los registros de pagos.",
                noPayments: "No se encontraron pagos",
                firstPayment: "Registra tu primer pago para empezar.",
                methods: {
                    cash: "Efectivo",
                    bankTransfer: "Transferencia bancaria",
                    upi: "UPI",
                    cheque: "Cheque",
                },
            },

            settlements: {
                eyebrow: "REGISTROS FINANCIEROS",
                title: "Liquidaciones",
                description: "Sigue el progreso de las liquidaciones de tus facturas y pagos.",
                history: "HISTORIAL DE LIQUIDACIONES",
                list: "Lista de liquidaciones",
                totalSettlements: "Total de liquidaciones",
                totalValue: "Valor total",
                completed: "Completadas",
                remaining: "Restante",
                paid: "Pagado",
                noSettlements: "No se encontraron liquidaciones",
                management: "GESTIÓN DE LIQUIDACIONES",
                addSettlement: "Añadir liquidación",
                newSettlement: "NUEVA LIQUIDACIÓN",
                updateSettlement: "ACTUALIZAR LIQUIDACIÓN",
                editSettlement: "Editar liquidación",
                selectInvoice: "Seleccionar factura",
                settlementDate: "Fecha de liquidación",
                remarks: "Observaciones",
                remarksPlaceholder: "Añade observaciones",
                saveSettlement: "Guardar liquidación",
                saving: "Guardando...",
                records: "REGISTROS DE LIQUIDACIONES",
                loading: "Cargando liquidaciones...",
                loadingDescription: "Espera mientras se cargan las liquidaciones.",
                firstSettlement: "Crea tu primera liquidación para empezar.",
            },

            reports: {
                eyebrow: "INFORMES",
                title: "Informes",
                description: "Informes financieros y de liquidaciones del gestor de cuentas.",
                revenue: "Informe de ingresos",
                customers: "Informe de saldos de clientes",
                vendors: "Informe de pagos a proveedores",
                settlements: "Resumen de liquidaciones",
                year: "Año",
                month: "Mes",
            },

            users: {
                eyebrow: "GESTIÓN DE USUARIOS",
                title: "Gestión de usuarios",
                description: "Gestiona los usuarios registrados y sus roles de acceso.",
                registered: "Usuarios registrados",
                name: "Nombre",
                email: "Correo electrónico",
                phone: "Teléfono",
                role: "Rol",
                status: "Estado",
                actions: "Acciones",
                user: "Usuario",
                admin: "Administrador",
                editUser: "Editar usuario",
                saveChanges: "Guardar cambios",
                activeAccount: "Cuenta activa",
                noUsers: "No se encontraron usuarios",
                loadingUsers: "Cargando usuarios...",
            },

            profile: {
                eyebrow: "MI CUENTA",
                title: "Perfil",
                description: "Consulta la información de tu cuenta.",
                accountInformation: "INFORMACIÓN DE LA CUENTA",
                personalInformation: "Información personal",
                accountStatus: "Estado de la cuenta",
                memberSince: "Miembro desde",
                notProvided: "No proporcionado",
                loading: "Cargando perfil...",
                loadingDescription: "Espera mientras se carga la información de tu cuenta.",
                account: "Cuenta",
            },

            settings: {
                preferences: "PREFERENCIAS DE LA CUENTA",
                title: "Configuración",
                description: "Gestiona las preferencias de tu cuenta, las notificaciones y la apariencia de la aplicación.",
                language: "Idioma",
                languageDescription: "Elige el idioma de la aplicación.",
                appearance: "Apariencia",
                appearanceDescription: "Elige cómo se ve la aplicación.",
                notifications: "Notificaciones",
                security: "Seguridad",
                light: "Claro",
                dark: "Oscuro",
                system: "Sistema",
                lightDescription: "Usar el tema claro.",
                darkDescription: "Usar el tema oscuro.",
                systemDescription: "Seguir la apariencia de tu dispositivo.",
                lightModeSelected: "El modo claro está seleccionado actualmente.",
                darkModeSelected: "El modo oscuro está seleccionado actualmente.",
                systemModeSelected: "El modo sistema sigue la apariencia de tu dispositivo.",
                english: "Inglés",
                french: "Francés",
                spanish: "Español",
                portuguese: "Portugués",
                mandarin: "Chino mandarín",
                saveSettings: "Guardar configuración",
            },

            security: {
                account: "Seguridad de la cuenta",
                accountDescription: "Tu cuenta está protegida mediante acceso autenticado.",
                description: "Gestiona el acceso y la seguridad de tu cuenta.",
                password: "Contraseña",
                passwordDescription: "Actualiza la contraseña de tu cuenta.",
                changePassword: "Cambiar contraseña",
                signOut: "Cerrar sesión",
                signOutDescription: "Cierra la sesión actual.",
                secure: "Seguro",
                currentPassword: "Contraseña actual",
                newPassword: "Nueva contraseña",
                confirmPassword: "Confirmar nueva contraseña",
                passwordUpdated: "El cambio de contraseña está listo para la integración con el backend.",
                passwordModalDescription: "Actualiza la contraseña de tu cuenta utilizando el formulario siguiente.",
                currentPasswordPlaceholder: "Introduce la contraseña actual",
                newPasswordPlaceholder: "Introduce la nueva contraseña",
                confirmPasswordPlaceholder: "Confirma la nueva contraseña",
                updatePassword: "Actualizar contraseña",
            },

            notifications: {
                chooseUpdates: "Elige qué actualizaciones quieres recibir.",
                email: "Notificaciones por correo",
                emailDescription: "Recibe actualizaciones importantes de la cuenta por correo.",
                payment: "Notificaciones de pagos",
                paymentDescription: "Recibe avisos cuando cambien los pagos.",
                settlement: "Notificaciones de liquidaciones",
                settlementDescription: "Recibe actualizaciones sobre el progreso de las liquidaciones.",
            },

            messages: {
                settingsSaved: "Configuración guardada correctamente.",
                languageUpdated: "Idioma actualizado correctamente.",
                dashboardLoadError: "No se pudieron cargar los datos del panel.",
                profileLoadError: "No se pudo cargar el perfil.",
                paymentLoadError: "No se pudieron cargar los datos de pago.",
                paymentInvoiceRequired: "Selecciona una factura.",
                paymentAmountRequired: "El importe del pago debe ser superior a cero.",
                paymentSaveError: "No se pudo guardar el pago.",
                deletePayment: "¿Seguro que quieres eliminar este pago?",
                paymentDeleteError: "No se pudo eliminar el pago.",
                invoiceLoadError: "No se pudieron cargar los datos de las facturas.",
                invoiceRequiredFields: "Selecciona un usuario, cliente y proveedor.",
                invoiceAmountRequired: "El importe total debe ser superior a cero.",
                invoicePaidTooHigh: "El importe pagado no puede ser superior al importe total.",
                invoiceSaveError: "No se pudo guardar la factura.",
                deleteInvoice: "¿Seguro que quieres eliminar esta factura?",
                invoiceDeleteError: "No se pudo eliminar la factura.",
                addFirstCustomer: "Añade tu primer cliente para empezar.",
                confirmLogout: "¿Seguro que quieres cerrar sesión de esta cuenta?",
                currentPasswordRequired: "Introduce tu contraseña actual.",
                newPasswordRequired: "Introduce una nueva contraseña.",
                passwordMinLength: "La nueva contraseña debe contener al menos 6 caracteres.",
                passwordMismatch: "Las nuevas contraseñas no coinciden.",
                loadingCustomers: "Espera mientras se cargan los registros de clientes.",
                loadingVendors: "Espera mientras se cargan los registros de proveedores.",
                deleteCustomer: "¿Seguro que quieres eliminar este cliente?",
                deleteVendor: "¿Seguro que quieres eliminar este proveedor?",
                deleteUser: "¿Seguro que quieres eliminar este usuario?",
            },
        },
    },

    /* ===================================================
       PORTUGUESE
    =================================================== */

    pt: {
        translation: {

            app: {
                name: "Gestor de Liquidação de Contas",
                welcome: "Bem-vindo",
            },

            menu: {
                mainMenu: "MENU PRINCIPAL",
                adminMenu: "MENU DO ADMINISTRADOR",
                dashboard: "Painel",
                customers: "Clientes",
                vendors: "Fornecedores",
                invoices: "Faturas",
                payments: "Pagamentos",
                settlements: "Liquidações",
                reports: "Relatórios",
                users: "Utilizadores",
                profile: "Perfil",
                settings: "Definições",
                logout: "Sair",
            },

            user: {
                account: "Conta do Utilizador",
                administrator: "Administrador",
                user: "Utilizador",
            },

            common: {
                add: "Adicionar",
                edit: "Editar",
                delete: "Eliminar",
                cancel: "Cancelar",
                save: "Guardar",
                update: "Atualizar",
                refresh: "Atualizar",
                search: "Pesquisar",
                loading: "A carregar...",
                active: "Ativo",
                inactive: "Inativo",
                pending: "Pendente",
                partial: "Parcial",
                paid: "Pago",
                completed: "Concluído",
                total: "Total",
                value: "Valor",
                amount: "Valor",
                balance: "Saldo",
                remaining: "Restante",
                status: "Estado",
                date: "Data",
                actions: "Ações",
                customer: "Cliente",
                vendor: "Fornecedor",
                invoice: "Fatura",
                payment: "Pagamento",
                settlement: "Liquidação",
                company: "Empresa",
                email: "Email",
                phone: "Telefone",
                noData: "Nenhum dado disponível",
                yes: "Sim",
                no: "Não",
            },

            navbar: {
                welcome: "Bem-vindo",
            },

            dashboard: {
                eyebrow: "PAINEL DO UTILIZADOR",
                title: "Bem-vindo de volta",
                description: "Aqui está uma visão rápida da sua conta, faturas, pagamentos e liquidações.",
                invoices: "Minhas Faturas",
                payments: "Meus Pagamentos",
                settlements: "Minhas Liquidações",
                outstanding: "Em Aberto",
                totalInvoices: "Total de faturas",
                paymentsMade: "Pagamentos efetuados",
                settlementRecords: "Registos de liquidações",
                amountRemaining: "Valor restante",
                accountDetails: "DETALHES DA CONTA",
                information: "As suas informações",
                fullName: "Nome Completo",
                email: "Endereço de Email",
            },

            adminDashboard: {
                eyebrow: "VISÃO GERAL DO ADMINISTRADOR",
                title: "Painel do Administrador",
                description: "Monitorize clientes, fornecedores, faturas, pagamentos e liquidações num só lugar.",
                systemActive: "Sistema Ativo",
                loadingTitle: "A carregar o painel do administrador...",
                loadingDescription: "Aguarde enquanto carregamos os dados da sua conta.",
                totalCustomers: "Total de Clientes",
                registeredCustomers: "Clientes registados",
                totalVendors: "Total de Fornecedores",
                registeredVendors: "Fornecedores registados",
                totalInvoices: "Total de Faturas",
                invoicesCreated: "Faturas criadas",
                totalPayments: "Total de Pagamentos",
                paymentsRecorded: "Pagamentos registados",
                totalSettlements: "Total de Liquidações",
                settlementRecords: "Registos de liquidações",
                pendingInvoices: "Faturas Pendentes",
                awaitingPayment: "Faturas a aguardar pagamento",
                completedSettlements: "Liquidações Concluídas",
                successfullyCompleted: "Concluídas com sucesso",
                businessOverview: "VISÃO GERAL DO NEGÓCIO",
                settlementActivity: "Atividade de Liquidação",
                tracked: "Monitorizadas",
                recorded: "Registados",
                managed: "Geridas",
                completed: "Concluídas",
                closed: "Fechadas",
            },

            customers: {
                eyebrow: "GESTÃO DE CLIENTES",
                title: "Clientes",
                description: "Gira os seus clientes, dados de contacto e saldos pendentes.",
                records: "REGISTOS DE CLIENTES",
                list: "Lista de Clientes",
                totalCustomers: "Total de Clientes",
                activeCustomers: "Clientes Ativos",
                outstanding: "Saldo Pendente",
                withOutstanding: "Com Saldo Pendente",
                statusTitle: "ESTADO DOS CLIENTES",
                overview: "Visão Geral",
                newCustomer: "NOVO CLIENTE",
                updateCustomer: "ATUALIZAR CLIENTE",
                addCustomer: "Adicionar Cliente",
                editCustomer: "Editar Cliente",
                customerName: "Nome do Cliente",
                companyName: "Nome da Empresa",
                email: "Endereço de Email",
                phone: "Número de Telefone",
                address: "Morada",
                balance: "Saldo Pendente",
                noCustomers: "Nenhum cliente encontrado",
            },

            vendors: {
                eyebrow: "GESTÃO DE FORNECEDORES",
                title: "Fornecedores",
                description: "Gira fornecedores, dados de contacto e valores a pagar.",
                records: "REGISTOS DE FORNECEDORES",
                list: "Lista de Fornecedores",
                totalVendors: "Total de Fornecedores",
                activeVendors: "Fornecedores Ativos",
                totalPayable: "Total a Pagar",
                withPayable: "Com Valor a Pagar",
                statusTitle: "ESTADO DOS FORNECEDORES",
                overview: "Visão Geral",
                newVendor: "NOVO FORNECEDOR",
                updateVendor: "ATUALIZAR FORNECEDOR",
                addVendor: "Adicionar Fornecedor",
                editVendor: "Editar Fornecedor",
                vendorName: "Nome do Fornecedor",
                companyName: "Nome da Empresa",
                email: "Endereço de Email",
                phone: "Número de Telefone",
                address: "Morada",
                payable: "Valor a Pagar",
                noVendors: "Nenhum fornecedor encontrado",
            },

            invoices: {
                eyebrow: "REGISTOS FINANCEIROS",
                title: "Faturas",
                description: "Gira faturas de clientes, fornecedores e utilizadores.",
                records: "REGISTOS DE FATURAS",
                list: "Lista de Faturas",
                totalInvoices: "Total de Faturas",
                totalValue: "Valor Total",
                totalPaid: "Total Pago",
                outstanding: "Pendente",
                paymentStatus: "ESTADO DOS PAGAMENTOS",
                overview: "Visão Geral das Faturas",
                newInvoice: "NOVA FATURA",
                updateInvoice: "ATUALIZAR FATURA",
                addInvoice: "Adicionar Fatura",
                editInvoice: "Editar Fatura",
                invoiceNumber: "Número da Fatura",
                assignedUser: "Utilizador Atribuído",
                invoiceDate: "Data da Fatura",
                dueDate: "Data de Vencimento",
                paidAmount: "Valor Pago",
                balanceAmount: "Valor Restante",
                noInvoices: "Nenhuma fatura encontrada",
                selectUser: "Selecionar Utilizador",
                selectCustomer: "Selecionar Cliente",
                selectVendor: "Selecionar Fornecedor",
                notes: "Notas",
                notesPlaceholder: "Adicione notas para esta fatura...",
                saving: "A guardar...",
                saveInvoice: "Guardar Fatura",
                loading: "A carregar faturas...",
                loadingDescription: "Aguarde enquanto os seus registos são carregados.",
                createFirst: "Crie a sua primeira fatura para começar a acompanhar as suas contas.",
                record: "Registo de fatura",
            },

            payments: {
                eyebrow: "REGISTOS FINANCEIROS",
                title: "Pagamentos",
                description: "Registe, acompanhe e gira pagamentos associados às faturas.",
                management: "GESTÃO DE PAGAMENTOS",
                addPayment: "Adicionar Pagamento",
                totalPayments: "Total de Pagamentos",
                totalAmount: "Valor Total",
                totalPaid: "Total Pago",
                recordedTransactions: "Transações registadas",
                totalReceived: "Valor total recebido",
                availableInvoices: "Faturas disponíveis",
                paymentHistory: "Histórico de Pagamentos",
                records: "REGISTOS DE PAGAMENTOS",
                updatePayment: "ATUALIZAR PAGAMENTO",
                newPayment: "NOVO PAGAMENTO",
                editPayment: "Editar Pagamento",
                recordPayment: "Registar Pagamento",
                selectInvoice: "Selecionar Fatura",
                balance: "saldo",
                paymentAmount: "Valor do Pagamento",
                amountPlaceholder: "Introduza o valor do pagamento",
                paymentMethod: "Método de Pagamento",
                paymentDate: "Data do Pagamento",
                transactionId: "ID da Transação",
                transactionPlaceholder: "Introduza o ID da transação",
                remarks: "Observações",
                remarksPlaceholder: "Adicione observações ao pagamento",
                saving: "A guardar...",
                savePayment: "Guardar Pagamento",
                loading: "A carregar pagamentos...",
                loadingDescription: "Aguarde enquanto os registos de pagamentos são carregados.",
                noPayments: "Nenhum pagamento encontrado",
                firstPayment: "Registe o seu primeiro pagamento para começar.",
                methods: {
                    cash: "Dinheiro",
                    bankTransfer: "Transferência Bancária",
                    upi: "UPI",
                    cheque: "Cheque",
                },
            },

            settlements: {
                eyebrow: "REGISTOS FINANCEIROS",
                title: "Liquidações",
                description: "Acompanhe o progresso das liquidações das suas faturas e pagamentos.",
                history: "HISTÓRICO DE LIQUIDAÇÕES",
                list: "Lista de Liquidações",
                totalSettlements: "Total de Liquidações",
                totalValue: "Valor Total",
                completed: "Concluídas",
                remaining: "Restante",
                paid: "Pago",
                noSettlements: "Nenhuma liquidação encontrada",
                management: "GESTÃO DE LIQUIDAÇÕES",
                addSettlement: "Adicionar Liquidação",
                newSettlement: "NOVA LIQUIDAÇÃO",
                updateSettlement: "ATUALIZAR LIQUIDAÇÃO",
                editSettlement: "Editar Liquidação",
                selectInvoice: "Selecionar Fatura",
                settlementDate: "Data da Liquidação",
                remarks: "Observações",
                remarksPlaceholder: "Adicione observações",
                saveSettlement: "Guardar Liquidação",
                saving: "A guardar...",
                records: "REGISTOS DE LIQUIDAÇÕES",
                loading: "A carregar liquidações...",
                loadingDescription: "Aguarde enquanto os registos de liquidações são carregados.",
                firstSettlement: "Crie a sua primeira liquidação para começar.",
            },

            reports: {
                eyebrow: "RELATÓRIOS",
                title: "Relatórios",
                description: "Relatórios financeiros e de liquidação do Gestor de Liquidação de Contas.",
                revenue: "Relatório de Receitas",
                customers: "Relatório de Saldos de Clientes",
                vendors: "Relatório de Valores a Pagar aos Fornecedores",
                settlements: "Resumo de Liquidações",
                year: "Ano",
                month: "Mês",
            },

            users: {
                eyebrow: "GESTÃO DE UTILIZADORES",
                title: "Gestão de Utilizadores",
                description: "Gira utilizadores registados e os seus níveis de acesso.",
                registered: "Utilizadores Registados",
                name: "Nome",
                email: "Email",
                phone: "Telefone",
                role: "Função",
                status: "Estado",
                actions: "Ações",
                user: "Utilizador",
                admin: "Administrador",
                editUser: "Editar Utilizador",
                saveChanges: "Guardar Alterações",
                activeAccount: "Conta Ativa",
                noUsers: "Nenhum utilizador encontrado",
                loadingUsers: "A carregar utilizadores...",
            },

            profile: {
                eyebrow: "A MINHA CONTA",
                title: "Perfil",
                description: "Veja as informações da sua conta.",
                accountInformation: "INFORMAÇÕES DA CONTA",
                personalInformation: "Informações Pessoais",
                accountStatus: "Estado da Conta",
                memberSince: "Membro Desde",
                notProvided: "Não fornecido",
                loading: "A carregar perfil...",
                loadingDescription: "Aguarde enquanto as informações da sua conta são carregadas.",
                account: "Conta",
            },

            settings: {
                preferences: "PREFERÊNCIAS DA CONTA",
                title: "Definições",
                description: "Gira as preferências da sua conta, notificações e aparência da aplicação.",
                language: "Idioma",
                languageDescription: "Escolha o idioma da aplicação.",
                appearance: "Aparência",
                appearanceDescription: "Escolha como a aplicação aparece.",
                notifications: "Notificações",
                security: "Segurança",
                light: "Claro",
                dark: "Escuro",
                system: "Sistema",
                lightDescription: "Utilize o tema claro da aplicação.",
                darkDescription: "Utilize o tema escuro da aplicação.",
                systemDescription: "Seguir a aparência do seu dispositivo.",
                lightModeSelected: "O modo claro está atualmente selecionado.",
                darkModeSelected: "O modo escuro está atualmente selecionado.",
                systemModeSelected: "O modo sistema segue a aparência do seu dispositivo.",
                english: "Inglês",
                french: "Francês",
                spanish: "Espanhol",
                portuguese: "Português",
                mandarin: "Mandarim",
                saveSettings: "Guardar Definições",
            },

            security: {
                account: "Segurança da Conta",
                accountDescription: "A sua conta está protegida por acesso autenticado.",
                description: "Gira o acesso e a segurança da sua conta.",
                password: "Palavra-passe",
                passwordDescription: "Atualize a palavra-passe da sua conta.",
                changePassword: "Alterar Palavra-passe",
                signOut: "Sair",
                signOutDescription: "Termine a sessão atual.",
                secure: "Seguro",
                currentPassword: "Palavra-passe Atual",
                newPassword: "Nova Palavra-passe",
                confirmPassword: "Confirmar Nova Palavra-passe",
                passwordUpdated: "A alteração da palavra-passe está pronta para integração com o backend.",
                passwordModalDescription: "Atualize a palavra-passe da sua conta utilizando o formulário abaixo.",
                currentPasswordPlaceholder: "Introduza a palavra-passe atual",
                newPasswordPlaceholder: "Introduza a nova palavra-passe",
                confirmPasswordPlaceholder: "Confirme a nova palavra-passe",
                updatePassword: "Atualizar Palavra-passe",
            },

            notifications: {
                chooseUpdates: "Escolha as atualizações que pretende receber.",
                email: "Notificações por Email",
                emailDescription: "Receba atualizações importantes da conta por email.",
                payment: "Notificações de Pagamentos",
                paymentDescription: "Receba notificações quando os pagamentos forem alterados.",
                settlement: "Notificações de Liquidações",
                settlementDescription: "Receba atualizações sobre o progresso das liquidações.",
            },

            messages: {
                settingsSaved: "Definições guardadas com sucesso.",
                languageUpdated: "Idioma atualizado com sucesso.",
                dashboardLoadError: "Não foi possível carregar os dados do painel.",
                profileLoadError: "Não foi possível carregar o perfil.",
                paymentLoadError: "Não foi possível carregar os dados dos pagamentos.",
                paymentInvoiceRequired: "Selecione uma fatura.",
                paymentAmountRequired: "O valor do pagamento deve ser superior a zero.",
                paymentSaveError: "Não foi possível guardar o pagamento.",
                deletePayment: "Tem a certeza de que pretende eliminar este pagamento?",
                paymentDeleteError: "Não foi possível eliminar o pagamento.",
                invoiceLoadError: "Não foi possível carregar os dados das faturas.",
                invoiceRequiredFields: "Selecione um utilizador, cliente e fornecedor.",
                invoiceAmountRequired: "O valor total deve ser superior a zero.",
                invoicePaidTooHigh: "O valor pago não pode ser superior ao valor total.",
                invoiceSaveError: "Não foi possível guardar a fatura.",
                deleteInvoice: "Tem a certeza de que pretende eliminar esta fatura?",
                invoiceDeleteError: "Não foi possível eliminar a fatura.",
                addFirstCustomer: "Adicione o seu primeiro cliente para começar.",
                confirmLogout: "Tem a certeza de que pretende sair desta conta?",
                currentPasswordRequired: "Introduza a sua palavra-passe atual.",
                newPasswordRequired: "Introduza uma nova palavra-passe.",
                passwordMinLength: "A nova palavra-passe deve conter pelo menos 6 caracteres.",
                passwordMismatch: "As novas palavras-passe não coincidem.",
                loadingCustomers: "Aguarde enquanto os registos dos clientes são carregados.",
                loadingVendors: "Aguarde enquanto os registos dos fornecedores são carregados.",
                deleteCustomer: "Tem a certeza de que pretende eliminar este cliente?",
                deleteVendor: "Tem a certeza de que pretende eliminar este fornecedor?",
                deleteUser: "Tem a certeza de que pretende eliminar este utilizador?",
            },
        },
    },

    /* ===================================================
       MANDARIN / CHINESE
    =================================================== */

    zh: {
        translation: {

            app: {
                name: "账户结算跟踪系统",
                welcome: "欢迎",
            },

            menu: {
                mainMenu: "主菜单",
                adminMenu: "管理员菜单",
                dashboard: "仪表板",
                customers: "客户",
                vendors: "供应商",
                invoices: "发票",
                payments: "付款",
                settlements: "结算",
                reports: "报告",
                users: "用户",
                profile: "个人资料",
                settings: "设置",
                logout: "退出登录",
            },

            user: {
                account: "用户账户",
                administrator: "管理员",
                user: "用户",
            },

            common: {
                add: "添加",
                edit: "编辑",
                delete: "删除",
                cancel: "取消",
                save: "保存",
                update: "更新",
                refresh: "刷新",
                search: "搜索",
                loading: "加载中...",
                active: "启用",
                inactive: "停用",
                pending: "待处理",
                partial: "部分",
                paid: "已支付",
                completed: "已完成",
                total: "总计",
                value: "价值",
                amount: "金额",
                balance: "余额",
                remaining: "剩余",
                status: "状态",
                date: "日期",
                actions: "操作",
                customer: "客户",
                vendor: "供应商",
                invoice: "发票",
                payment: "付款",
                settlement: "结算",
                company: "公司",
                email: "电子邮件",
                phone: "电话",
                noData: "暂无数据",
                yes: "是",
                no: "否",
            },

            navbar: {
                welcome: "欢迎",
            },

            dashboard: {
                eyebrow: "用户仪表板",
                title: "欢迎回来",
                description: "这里是您的账户、发票、付款和结算的快速概览。",
                invoices: "我的发票",
                payments: "我的付款",
                settlements: "我的结算",
                outstanding: "待结余额",
                totalInvoices: "发票总数",
                paymentsMade: "已完成付款",
                settlementRecords: "结算记录",
                amountRemaining: "剩余金额",
                accountDetails: "账户详情",
                information: "您的信息",
                fullName: "姓名",
                email: "电子邮件地址",
            },

            adminDashboard: {
                eyebrow: "管理员概览",
                title: "管理员仪表板",
                description: "在一个地方监控客户、供应商、发票、付款和结算。",
                systemActive: "系统正常",
                loadingTitle: "正在加载管理员仪表板...",
                loadingDescription: "请稍候，我们正在加载您的账户数据。",
                totalCustomers: "客户总数",
                registeredCustomers: "已注册客户",
                totalVendors: "供应商总数",
                registeredVendors: "已注册供应商",
                totalInvoices: "发票总数",
                invoicesCreated: "已创建发票",
                totalPayments: "付款总数",
                paymentsRecorded: "已记录付款",
                totalSettlements: "结算总数",
                settlementRecords: "结算记录",
                pendingInvoices: "待处理发票",
                awaitingPayment: "等待付款的发票",
                completedSettlements: "已完成结算",
                successfullyCompleted: "已成功完成",
                businessOverview: "业务概览",
                settlementActivity: "结算活动",
                tracked: "已跟踪",
                recorded: "已记录",
                managed: "已管理",
                completed: "已完成",
                closed: "已关闭",
            },

            customers: {
                eyebrow: "客户管理",
                title: "客户",
                description: "管理客户、联系方式和未结余额。",
                records: "客户记录",
                list: "客户列表",
                totalCustomers: "客户总数",
                activeCustomers: "活跃客户",
                outstanding: "未结余额",
                withOutstanding: "有未结余额",
                statusTitle: "客户状态",
                overview: "账户概览",
                newCustomer: "新客户",
                updateCustomer: "更新客户",
                addCustomer: "添加客户",
                editCustomer: "编辑客户",
                customerName: "客户名称",
                companyName: "公司名称",
                email: "电子邮件地址",
                phone: "电话号码",
                address: "地址",
                balance: "未结余额",
                noCustomers: "未找到客户",
            },

            vendors: {
                eyebrow: "供应商管理",
                title: "供应商",
                description: "管理供应商、联系方式和应付款项。",
                records: "供应商记录",
                list: "供应商列表",
                totalVendors: "供应商总数",
                activeVendors: "活跃供应商",
                totalPayable: "应付总额",
                withPayable: "有应付款",
                statusTitle: "供应商状态",
                overview: "账户概览",
                newVendor: "新供应商",
                updateVendor: "更新供应商",
                addVendor: "添加供应商",
                editVendor: "编辑供应商",
                vendorName: "供应商名称",
                companyName: "公司名称",
                email: "电子邮件地址",
                phone: "电话号码",
                address: "地址",
                payable: "应付金额",
                noVendors: "未找到供应商",
            },

            invoices: {
                eyebrow: "财务记录",
                title: "发票",
                description: "管理客户、供应商和用户发票。",
                records: "发票记录",
                list: "发票列表",
                totalInvoices: "发票总数",
                totalValue: "总价值",
                totalPaid: "已付总额",
                outstanding: "未结",
                paymentStatus: "付款状态",
                overview: "发票概览",
                newInvoice: "新发票",
                updateInvoice: "更新发票",
                addInvoice: "添加发票",
                editInvoice: "编辑发票",
                invoiceNumber: "发票编号",
                assignedUser: "指定用户",
                invoiceDate: "发票日期",
                dueDate: "到期日期",
                paidAmount: "已付金额",
                balanceAmount: "剩余金额",
                noInvoices: "未找到发票",
                selectUser: "选择用户",
                selectCustomer: "选择客户",
                selectVendor: "选择供应商",
                notes: "备注",
                notesPlaceholder: "为此发票添加备注...",
                saving: "正在保存...",
                saveInvoice: "保存发票",
                loading: "正在加载发票...",
                loadingDescription: "请稍候，我们正在加载您的记录。",
                createFirst: "创建您的第一张发票，开始跟踪您的账户。",
                record: "发票记录",
            },

            payments: {
                eyebrow: "财务记录",
                title: "付款",
                description: "记录、监控和管理与发票相关的付款。",
                management: "付款管理",
                addPayment: "添加付款",
                totalPayments: "付款总数",
                totalAmount: "总金额",
                totalPaid: "已付总额",
                recordedTransactions: "已记录交易",
                totalReceived: "收到的总金额",
                availableInvoices: "可用发票",
                paymentHistory: "付款历史",
                records: "付款记录",
                updatePayment: "更新付款",
                newPayment: "新付款",
                editPayment: "编辑付款",
                recordPayment: "记录付款",
                selectInvoice: "选择发票",
                balance: "余额",
                paymentAmount: "付款金额",
                amountPlaceholder: "输入付款金额",
                paymentMethod: "付款方式",
                paymentDate: "付款日期",
                transactionId: "交易编号",
                transactionPlaceholder: "输入交易编号",
                remarks: "备注",
                remarksPlaceholder: "添加付款备注",
                saving: "正在保存...",
                savePayment: "保存付款",
                loading: "正在加载付款...",
                loadingDescription: "请稍候，我们正在加载付款记录。",
                noPayments: "未找到付款",
                firstPayment: "记录您的第一笔付款即可开始。",
                methods: {
                    cash: "现金",
                    bankTransfer: "银行转账",
                    upi: "UPI",
                    cheque: "支票",
                },
            },

            settlements: {
                eyebrow: "财务记录",
                title: "结算",
                description: "跟踪您的发票和付款结算进度。",
                history: "结算历史",
                list: "结算列表",
                totalSettlements: "结算总数",
                totalValue: "总价值",
                completed: "已完成",
                remaining: "剩余",
                paid: "已支付",
                noSettlements: "未找到结算记录",
                management: "结算管理",
                addSettlement: "添加结算",
                newSettlement: "新结算",
                updateSettlement: "更新结算",
                editSettlement: "编辑结算",
                selectInvoice: "选择发票",
                settlementDate: "结算日期",
                remarks: "备注",
                remarksPlaceholder: "添加结算备注",
                saveSettlement: "保存结算",
                saving: "正在保存...",
                records: "结算记录",
                loading: "正在加载结算...",
                loadingDescription: "请稍候，我们正在加载结算记录。",
                firstSettlement: "创建您的第一条结算记录即可开始。",
            },

            reports: {
                eyebrow: "报告",
                title: "报告",
                description: "账户结算跟踪系统的财务和结算报告。",
                revenue: "收入报告",
                customers: "客户未结余额报告",
                vendors: "供应商应付款报告",
                settlements: "结算摘要",
                year: "年份",
                month: "月份",
            },

            users: {
                eyebrow: "用户管理",
                title: "用户管理",
                description: "管理注册用户及其访问角色。",
                registered: "注册用户",
                name: "姓名",
                email: "电子邮件",
                phone: "电话",
                role: "角色",
                status: "状态",
                actions: "操作",
                user: "用户",
                admin: "管理员",
                editUser: "编辑用户",
                saveChanges: "保存更改",
                activeAccount: "账户已启用",
                noUsers: "未找到用户",
                loadingUsers: "正在加载用户...",
            },

            profile: {
                eyebrow: "我的账户",
                title: "个人资料",
                description: "查看您的账户信息。",
                accountInformation: "账户信息",
                personalInformation: "个人信息",
                accountStatus: "账户状态",
                memberSince: "加入时间",
                notProvided: "未提供",
                loading: "正在加载个人资料...",
                loadingDescription: "请稍候，我们正在加载您的账户信息。",
                account: "账户",
            },

            settings: {
                preferences: "账户偏好",
                title: "设置",
                description: "管理您的账户偏好、通知和应用程序外观。",
                language: "语言",
                languageDescription: "选择应用程序语言。",
                appearance: "外观",
                appearanceDescription: "选择应用程序的显示方式。",
                notifications: "通知",
                security: "安全",
                light: "浅色",
                dark: "深色",
                system: "系统",
                lightDescription: "使用应用程序浅色主题。",
                darkDescription: "使用应用程序深色主题。",
                systemDescription: "跟随设备外观。",
                lightModeSelected: "当前已选择浅色模式。",
                darkModeSelected: "当前已选择深色模式。",
                systemModeSelected: "系统模式将跟随您的设备外观。",
                english: "英语",
                french: "法语",
                spanish: "西班牙语",
                portuguese: "葡萄牙语",
                mandarin: "普通话",
                saveSettings: "保存设置",
            },

            security: {
                account: "账户安全",
                accountDescription: "您的账户受到身份验证保护。",
                description: "管理您的账户访问权限和安全设置。",
                password: "密码",
                passwordDescription: "更新您的账户密码。",
                changePassword: "更改密码",
                signOut: "退出",
                signOutDescription: "退出当前会话。",
                secure: "安全",
                currentPassword: "当前密码",
                newPassword: "新密码",
                confirmPassword: "确认新密码",
                passwordUpdated: "密码修改已准备好连接后端。",
                passwordModalDescription: "使用下面的表单更新您的账户密码。",
                currentPasswordPlaceholder: "输入当前密码",
                newPasswordPlaceholder: "输入新密码",
                confirmPasswordPlaceholder: "确认新密码",
                updatePassword: "更新密码",
            },

            notifications: {
                chooseUpdates: "选择您希望接收的更新。",
                email: "电子邮件通知",
                emailDescription: "通过电子邮件接收重要账户更新。",
                payment: "付款通知",
                paymentDescription: "付款记录发生变化时接收通知。",
                settlement: "结算通知",
                settlementDescription: "接收有关结算进度的更新。",
            },

            messages: {
                settingsSaved: "设置保存成功。",
                languageUpdated: "语言更新成功。",
                dashboardLoadError: "无法加载仪表板数据。",
                profileLoadError: "无法加载个人资料。",
                paymentLoadError: "无法加载付款数据。",
                paymentInvoiceRequired: "请选择发票。",
                paymentAmountRequired: "付款金额必须大于零。",
                paymentSaveError: "无法保存付款。",
                deletePayment: "确定要删除此付款吗？",
                paymentDeleteError: "无法删除付款。",
                invoiceLoadError: "无法加载发票数据。",
                invoiceRequiredFields: "请选择用户、客户和供应商。",
                invoiceAmountRequired: "总金额必须大于零。",
                invoicePaidTooHigh: "已付金额不能高于总金额。",
                invoiceSaveError: "无法保存发票。",
                deleteInvoice: "确定要删除此发票吗？",
                invoiceDeleteError: "无法删除发票。",
                addFirstCustomer: "添加您的第一个客户即可开始。",
                confirmLogout: "确定要退出此账户吗？",
                currentPasswordRequired: "请输入当前密码。",
                newPasswordRequired: "请输入新密码。",
                passwordMinLength: "新密码必须至少包含 6 个字符。",
                passwordMismatch: "两次输入的新密码不一致。",
                loadingCustomers: "正在加载客户记录，请稍候。",
                loadingVendors: "正在加载供应商记录，请稍候。",
                deleteCustomer: "确定要删除此客户吗？",
                deleteVendor: "确定要删除此供应商吗？",
                deleteUser: "确定要删除此用户吗？",
            },
        },
    },
};

/* =====================================================
   INITIALIZE I18NEXT
===================================================== */

i18n
    .use(initReactI18next)
    .init({
        resources,

        lng: getSavedLanguage(),

        fallbackLng: "en",

        supportedLngs: SUPPORTED_LANGUAGES,

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: false,
        },
    });

/* =====================================================
   EXPORT
===================================================== */

export {
    SUPPORTED_LANGUAGES,
};

export default i18n;
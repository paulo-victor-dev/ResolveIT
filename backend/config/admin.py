from django.contrib.admin import AdminSite


class BackendAdminSite(AdminSite):
    site_header = "Backend Reutilizavel"
    site_title = "Backend Reutilizavel"
    index_title = "Administração"

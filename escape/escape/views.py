from django.shortcuts import render

def dashboard(request):
    return render(request, "dashboard.html")

def employee_directory(request):
    return render(request, "employee_directory.html")

def leave_directory(request):
    return render(request, "leave_directory.html")
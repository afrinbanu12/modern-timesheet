import csv
from datetime import date
from calendar import monthrange
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import TimesheetEntry


def index(request):
    return render(request, "timesheet/index.html")


def dashboard(request):
    return render(request, "timesheet/dashboard.html")


def timesheet_view(request):
    today = date.today()
    year = int(request.GET.get("year", today.year))
    month = int(request.GET.get("month", today.month))

    days_in_month = monthrange(year, month)[1]
    dates = [date(year, month, d) for d in range(1, days_in_month + 1)]

    if request.method == "POST":
        TimesheetEntry.objects.filter(
            date__year=year,
            date__month=month
        ).delete()

        for d in dates:
            hours = request.POST.get(f"hours_{d}", 0)
            task = request.POST.get(f"task_{d}", "")
            status = request.POST.get(f"status_{d}", "Work")

            TimesheetEntry.objects.create(
                date=d,
                hours=float(hours or 0),
                task=task,
                status=status
            )

        return redirect(f"{request.path}?year={year}&month={month}")

    existing_entries = {
        e.date: e for e in TimesheetEntry.objects.filter(
            date__year=year,
            date__month=month
        )
    }

    entries_list = []
    for d in dates:
        entries_list.append({
            "date": d,
            "entry": existing_entries.get(d)
        })

    return render(request, "timesheet/timesheet.html", {
        "entries_list": entries_list,
        "month": month,
        "year": year,
    })


def export_csv(request):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = "attachment; filename=timesheet.csv"

    writer = csv.writer(response)
    writer.writerow(["Date", "Hours", "Task", "Status"])

    for entry in TimesheetEntry.objects.all().order_by("date"):
        writer.writerow([
            entry.date,
            entry.hours,
            entry.task,
            entry.status
        ])

    return response

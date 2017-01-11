from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.views import generic
from django.views.generic import View
from .models import Module
from .forms import UserForm


def index(request):
    return render(request, 'mao/index.html')


def practice(request):
    return render(request, 'mao/practice.html')


def registration(request):
    return render(request, 'mao/registration.html')


class UserFormView(View):
    form_class = UserForm
    template_name = 'mao/registration.html'

    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form':form})

    def post(self, request):
        form = self.form_class(request.POST)

        if form.is_valid():

            user = form.save(commit=False)

            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user.set_password(password)
            user.save()

            user = authenticate(username=username, password=password)

            if user is not None:

                if user.is_active:
                    login(request, user)
                    return redirect('mao/index.html')

        return render(request, self.template_name, {'form': form})

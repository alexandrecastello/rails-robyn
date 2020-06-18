class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.welcome.subject
  #
  def welcome
  
    @user = params[:user]

    # check app/views/user_mailer
    mail(to: @user.mail, subject: 'Bem vindo à Robyn!')
  end
end

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    @pets = Pet.all.size > 1 ? Pet.all[-1..Pet.all.size] : Pet.all
  end

  def my_profile
    @pets = Pet.where(user: current_user)
  end

end

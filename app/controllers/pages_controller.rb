class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    @pets = Pet.order(created_at: :desc).first(4)
  end

  def my_profile
    @pets = Pet.where(user: current_user)
  end

end

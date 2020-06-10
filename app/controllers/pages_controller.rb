class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def my_profile
    @pets = Pet.where(user_id: @user_id)
    raise
  end

end

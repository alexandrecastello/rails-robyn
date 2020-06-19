class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    @pets = Pet.last(4).sort_by &:created_at
    @pets.reverse!
  end

  def my_profile
    @pets = Pet.where(user: current_user)
  end

end

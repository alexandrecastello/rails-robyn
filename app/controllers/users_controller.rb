class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update]

  def show
    raise
    @spotteds = @user.pets
  end

  def ny_profile
  end

  def new
    @user = User.new
  end

  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to @user, notice: "User updated"
    else
      render :edit
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
  
  def user_params
    params.require(:user).permit(%i[email name password first_name last_name photo])
  end

end

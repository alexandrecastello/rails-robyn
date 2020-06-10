class SpottedsController < ApplicationController
  skip_after_action :verify_authorized, only: %i[new]

  def new
    @spotted = Spotted.new   
    @pet = Pet.find(params[:pet_id]) 
  end
  

  def create
    @spotted = Spotted.new(spotted_params)
    @spotted.pet = Pet.find(params[:pet_id])
    @spotted.user = current_user
    #IMPLEMENTAR API para pegar longitude e latitude
    @spotted.save
    redirect_to pet_path(@spotted.pet)
    authorize @spotted
  end

  private

  def spotted_params
    params.require(:spotted).permit(:time, :description, :address, :seen_or_rescued)
  end
end

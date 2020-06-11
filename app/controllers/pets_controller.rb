class PetsController < ApplicationController
  before_action :set_pet, only: %i[show edit update destroy]
  #  pundit-implement
  skip_after_action :verify_authorized, only: %i[ show new ]

  def index
    @pets = Pet.all
    @pets = policy_scope(Pet)

    
  end
  
  def show
    @pets = Spotted.geocoded.where(pet_id: @pet)
    @markers = @pets.map do |spotted| 
      {
        lat: spotted.latitude,
        lng: spotted.longitude,
        infoWindow: render_to_string(partial: "pets/map_info_window", locals: { spotted: spotted })
      }
    end
    @markers << { lat: @pet.latitude, lng: @pet.longitude }
  end
  
  def new
    @pet = Pet.new
  end

  def create
    @pet = Pet.new(pet_params)
    @pet.user = current_user
    @pet.name = @pet.name.capitalize
    authorize @pet
    if @pet.save
      redirect_to pet_path(@pet), notice: 'Pet adicionado! Esperamos que ele retorne logo.'
    else
      redirect_to new_pet_path, notice: 'Algo deu errado, seu pet ainda não foi adicionado'
    end
  end
  
  def edit
    authorize @pet
  end

  def update
    authorize @pet
    @pet.update(pet_params)
    @pet.name = @pet.name.capitalize
    @pet.save
    redirect_to pet_path(@pet)
  end

  def destroy # rever se queremos que o usuário posso deletar produtos
    authorize @pet
    @pet.destroy
    redirect_to pets_path
  end

  private
  
  def pet_params
    params.require(:pet).permit(:name, :description, :species, :lost_date, :lost_location)
  end

  def set_pet
    @pet = Pet.find(params[:id])
  end
end

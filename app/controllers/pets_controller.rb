class PetsController < ApplicationController
  before_action :set_pet, only: %i[show edit update destroy]
  
  def index
    @pets = Pet.all
  end
  
  def show
  end

  def new
    @pet = Pet.new
  end

  def create
    @pet = Pet.new(pet_params)
    @pet.user = current_user
    @pet.name = @pet.name.capitalize
    if @pet.save
      redirect_to user_path(current_user), notice: 'Pet adicionado! Esperamos que ele retorne logo.'
    else
      redirect_to new_pet_path, notice: 'Algo deu errado, seu pet ainda não foi adicionado'
    end
  end
  
  def edit
  end

  def update
    @pet.update(pet_params)
    @pet.name = @pet.name.capitalize
    @pet.save
    redirect_to pet_path(@pet)
  end

  def destroy # rever se queremos que o usuário posso deletar produtos
    @pet.destroy
    redirect_to pets_path
  end

  private
  
  def pet_params
    params.require(:pet).permit(:name, :description, :species, :lost_date)
  end

  def set_pet
    @pet = Pet.find(params[:id])
  end
end

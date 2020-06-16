class PetsController < ApplicationController
  before_action :set_pet, only: %i[show edit update destroy pdf returned]
  #  pundit-implement
  skip_after_action :verify_authorized, only: %i[show new]
  skip_before_action :authenticate_user!, only: %i[index show]

  def index
    @pets = Pet.all
    @pets = policy_scope(Pet)
  end

  def show
    # Add all pet spotted location marker (icon:species)
    @markers = Spotted.geocoded.where(pet_id: @pet).map do |spotted|
      {
        lat: spotted.latitude,
        lng: spotted.longitude,
        infoWindow: render_to_string(partial: "spotteds/map_info_window", locals: { spotted: spotted }),
        image_url: helpers.asset_url(spotted.pet.icon)
      }
    end
    # Add pet lost_location marker (icon:house)
    @markers << {
                  lat: @pet.latitude,
                  lng: @pet.longitude,
                  infoWindow: render_to_string(partial: "pets/map_info_window", locals: { pet: @pet }),
                  image_url: helpers.asset_url('icons8-dog-house-50.png')
                }
  end

  def new
    @pet = Pet.new
  end

  def create
    @pet = Pet.new(pet_params)
    @pet.user = current_user
    @pet.name = @pet.name.capitalize
    case @pet.species
      when 'Cachorro'
        @pet.icon = 'icons8-dog-50.png'
      when 'Gato'
        @pet.icon = 'icons8-cat-50-4.png'
      when 'Ave'
        @pet.icon = 'icons8-puffin-bird-50-2.png'
    else
      @pet.icon = 'icons8-marker-48.png'
    end
    authorize @pet
    if @pet.save
      redirect_to pet_path(@pet), notice: 'Pet adicionado! Esperamos que ele retorne logo.'
    else
      redirect_to new_pet_path, notice: 'Algo deu errado, seu pet ainda não foi adicionado'
    end
  end

  def edit
  end

  def update
    if @pet.update(pet_params)
      @pet.name = @pet.name.capitalize
      case @pet.species # Icon update
        when 'Cachorro'
          @pet.icon = 'icons8-dog-50.png'
        when 'Gato'
          @pet.icon = 'icons8-cat-50-4.png'
        when 'Ave'
          @pet.icon = 'icons8-puffin-bird-50-2.png'
      else
        @pet.icon = 'icons8-marker-48.png'
      end
      @pet.save
      redirect_to pet_path(@pet), notice: "Pet atualizado.  #{ @pet.found_date ? 'Ficamos felizes em saber que seu pet voltou!' : 'Esperamos que ele retorne logo.' }"
    else
      redirect_to pet_path(@pet), notice: 'Algo deu errado, seu pet ainda não foi atualizado'
    end
  end

  def destroy
    @pet.destroy
    redirect_to pets_path
  end

  def returned
  end

  def pdf
    @pet = Pet.find(params[:pet_id])
    authorize @pet

    pdf_options = {
      :page_size   => "A4",
      :page_layout => :portrait,
      :margin      => [40, 75]
    }

    respond_to do |format|
      format.html
      format.pdf do
        pdf = Prawn::Document.new(pdf_options)
        pdf.text "Nome: #{@pet.name}"
        pdf.text "Espécie: #{@pet.species}"
        pdf.text "Descrição: #{@pet.description}"
        pdf.text "Perdido em: #{@pet.lost_date.to_s}"
        pdf.text "Local: #{@pet.lost_location.to_s}"
        send_data pdf.render, filename: 'pets.pdf', type: 'application/pdf'
      end
    end
  end

  private

  def pet_params
    params.require(:pet).permit(
      :name,
      :description,
      :species,
      :lost_date,
      :lost_location,
      :found_date,
      :photo)
  end

  def set_pet
    @pet = Pet.find(params[:id])
    authorize @pet
  end
end

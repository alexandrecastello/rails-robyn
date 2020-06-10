class SpottedsController < ApplicationController
  def new
    @spotted = Spotted.new    
  end
  

  def create
    @spotted = Spotted.new(spotted_params)
  end

  private

  def spotted_params
    params.require(:spotted).permit(:time, :description, :address, :seen_or_rescued)
  end
end

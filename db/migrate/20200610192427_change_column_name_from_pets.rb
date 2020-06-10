class ChangeColumnNameFromPets < ActiveRecord::Migration[6.0]
  def change
    rename_column(:pets, :lost_latitude, :latitude)
    rename_column(:pets, :lost_longitude, :longitude)
  end
end

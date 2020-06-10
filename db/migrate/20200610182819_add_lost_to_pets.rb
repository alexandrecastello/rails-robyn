class AddLostToPets < ActiveRecord::Migration[6.0]
  def change
    add_column :pets, :lost_location, :string
    add_column :pets, :lost_latitude, :float
    add_column :pets, :lost_longitude, :float
  end
end

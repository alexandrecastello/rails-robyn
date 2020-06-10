class AddSpottedRefToUser < ActiveRecord::Migration[6.0]
  def change
    add_reference :pets, :spotted, foreign_key: true
  end
end

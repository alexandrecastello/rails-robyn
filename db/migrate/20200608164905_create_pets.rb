class CreatePets < ActiveRecord::Migration[6.0]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :species
      t.string :description
      t.time :lost_date
      t.time :found_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

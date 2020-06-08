Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :pets do
    resources :spotted, only: :create
  end
  get 'user_profile', to: "pages#user_profile", as:'user'
end

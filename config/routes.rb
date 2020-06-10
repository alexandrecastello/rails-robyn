Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # get '/404', to: "errors#not_found"
  # get '/422', to: "errors#unnacceptable"
  # get '/500', to: "errors#internal_error"

  resources :pets do
<<<<<<< HEAD
    resources :spotted, only: %i[create]
=======
    resources :spotteds, only: %i[show new create]
>>>>>>> 5999914a73ce93d8f2941e3e3e18a0e46f021d91
  end
  
  get 'my_profile', to: "pages#my_profile", as:'profile'
  

end

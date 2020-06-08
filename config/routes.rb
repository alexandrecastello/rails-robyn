Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html


  get '/404', to: "errors#not_found"
  get '/422', to: "errors#unnacceptable"
  get '/500', to: "errors#internal_error"
end

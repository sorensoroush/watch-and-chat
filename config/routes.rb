Rails.application.routes.draw do
  post '/users', to: 'users#create'
  post '/login', to: 'authentication#login'
  resources :rooms
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

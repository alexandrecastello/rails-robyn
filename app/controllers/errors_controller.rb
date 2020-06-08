class ErrorsController < ApplicationController
  # skip user authentication to see error pages
  skip_before_action :authenticate_user!

  def not_found
    respond_to do |format|
      # check public html files for html view
      format.html.erb { render status: 404 }
    end
  end

  def unacceptable
    respond_to do |format|
       # check public html files for html view
      format.html.erb { render status: 422 }
    end
  end

  def internal_error
    respond_to do |format|
       # check public html files for html view
      format.html.erb { render status: 500 }
    end
  end
end
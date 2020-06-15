IMGKit.configure do |config|
  # config.wkhtmltoimage = "/usr/bin/wkhtmltoimage"
  config.default_format = :jpg
  config.wkhtmltoimage = Rails.root.join('bin', 'wkhtmltoimage').to_s 
  
end
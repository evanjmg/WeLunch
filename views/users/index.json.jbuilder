json.array!(@users) do |user|
  json.extract! user, :linkedin.url, :linkedin.name, :linkedin.location, :linkedin.industry, :linkedin.avatar, linkedin.access_token
  json.url user_url(user, format: :json)
end

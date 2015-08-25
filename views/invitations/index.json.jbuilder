json.array!(@invitations) do |invitation|
  json.extract! invitation, :_user
  json.url invitation_url(invitation, format: :json)
end
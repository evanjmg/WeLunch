json.array!(@events) do |event|
  json.extract! event, :title, :_owner, :_invitee, :start_time, :end_time, location, :message
  json.url event_url(event, format: :json)
end
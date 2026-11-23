CREATE TABLE status_history (
    id BIGSERIAL PRIMARY KEY,
    app_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_status_history_user_app_changed
  ON status_history (user_id, app_id, changed_at);

CREATE INDEX idx_status_history_app
  ON status_history(app_id);
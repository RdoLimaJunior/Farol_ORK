# Data Model & UI Mapping: OKR Updates

## New Schema Fields (Key Results Table)

- `dimension`: `string` ('greater_is_better', 'smaller_is_better')
- `relevance`: `float` (0.0 to 1.0)
- `confidence`: `string` ('low', 'mid', 'high')
- `current_value`: `float`
- `baseline_value`: `float`
- `target_value`: `float`

## New Entity: `check_ins`

- `id`: UUID (Primary Key)
- `key_result_id`: UUID (Foreign Key)
- `value`: `float`
- `confidence`: `string`
- `comment`: `text`
- `created_at`: TIMESTAMP
- `created_by`: UUID (Foreign Key)

## UI Component Mapping

| Component | Responsibility |
|-----------|----------------|
| `CheckInModal` | Form to input current value, confidence, and comment. |
| `OkrValueEditor` | Inline or modal editing of target, baseline, and relevance. |
| `EventTimeline` | Display of recent check-ins for a specific KR/Objective. |

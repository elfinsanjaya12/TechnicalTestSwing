Databases:

# store

- id [uuid | integer]
- name [string]
- url [string]
- address [string]
- phone [string]
- operational_time_start [number]
- operational_time_end [number]

# products

- id [uuid | integer]
- title [string]
- url [string]
- price [float]
- description [text]
- store_id [uuid | integer] // relation

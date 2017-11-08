# Variables

target_container ?= node

# Bash Commands

.PHONY: command
command:
	docker-compose run --rm $(target_container) $(cmd)

.PHONY: bash
bash:
	docker-compose exec '$(target_container)' bash

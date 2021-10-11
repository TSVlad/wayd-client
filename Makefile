build:
	docker build -t tsvlad/wayd-client .
run:
	docker run -d -p 3000:3000 --name wayd-client --rm tsvlad/wayd-client
stop:
	docker stop wayd-client
start:
	make build
	make run

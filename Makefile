build:
	docker build -t tsvlad/wayd-client:1.0.0 .
run:
	docker run -d -p 3000:3000 --name wayd-client --rm tsvlad/wayd-client:1.0.0
stop:
	docker stop wayd-client
start:
	make build
	make run

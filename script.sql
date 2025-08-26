drop table if exists flash_sale;
create table flash_sale (
	id bigserial,
	name varchar(256),
	price DECIMAL,
	quantity int4,
	start_time timestamp,
	end_time timestamp
);

drop table if exists flash_sale_order;
create table flash_sale_order (
	id bigserial,
	flash_sale_id bigint,
	phone varchar(20)
);

insert into flash_sale (name, price, quantity, start_time, end_time) values ('Iphone 15', 1000, 20, '20250826T09:00:00', '20250826T12:00:00');

select * from flash_sale;
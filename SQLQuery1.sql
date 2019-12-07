create table activities(
	id varchar(255) primary key,
	activityName varchar(255),
	locationName varchar(255),
	activityDate date
)

insert into activities(id, activityName, locationName, activityDate)
values ('19b5d164-1875-11ea-9b2f-9822eff32488', 'todo1', 'marasti', DATE('12/22/2019')),
('19b5d165-1875-11ea-bb87-9822eff32488', 'todo2', 'manastur', '12/23/2019'),
('19b5d166-1875-11ea-bf23-9822eff32488', 'todo3', 'floresti', '12/24/2019')

delete from activities
drop table activities
select * from activities
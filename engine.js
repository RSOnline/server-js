var ItemType = {
	HEAL : 0, // Предмет лечит
	KILL : 1, // Предмет ранит
	QUEST : 2, // Квестовой предмет
	OTHER : -1 // Обычный предмет
}

/*
	Создает предмет

	Params:
		_name = Имя предмета
		_type = Тип предмета
		_value = На сколько предмет используется(по КПД)

	Example:
	---
		// Это яблоко, он лечит 15 ХП
		let item = ItemInit('Яблоко',ItemType.HEAL,15);
	---

	Returns:
		struct {name,type,value}
*/
function ItemInit(_name,_type,_value)
{
	return {
		name : _name,
		type : _type,
		value : _value
	}
}

/*
	Создает инвентарь

	Returns:
		struct {items[],len}
*/
function InventoryInit()
{
	return {
		items : [],
		len : 0
	};
}

/*
	Создает сетевого пользователя

	Returns:
		struct {name,password,avatar,inventory,id,socket}
*/
function _PlayerInit()
{
  return {
  	name : "nullstr",
  	password : "nullstr",
  	avatar : null,
  	inventory : InventoryInit(),

  	// Уникальная идентификация
  	// id - локальная
  	// socket - глобальная
  	id : null,
  	socket : null // обнулять, если сохраняете!
  };
}

/*
	Создает сетевого пользователя

	Params:
		name = Имя пользователя
		password = Его пароль
		socket = Сессия
		id = Идентификатор

	Example:
	---
		socket.on('reg',function(msg) {
			let _msg = JSON.parse(msg);
			assert(error_handle(msg)); // проверка на ошибки
			arr_len++;
			array[arr_len] = PlayerInit(_msg.name,_msg.pass,socket,arr_len);
		});
	---

	Returns:
		struct {name,password,avatar,inventory,id,socket}
*/
function PlayerInit(name,password,socket,id)
{
	let _t = _PlayerInit();
	_t.name = name;
	_t.password = password;
	_t.socket = socket;
	_t.id = id;

	return _t;
}

/*
	Создает предмет в инвентаре игрока

	Params:
		pl = Игрок
		itm = Предмет

	Example:
	---
		PlayerInvItemAdd(Player,ItemInit('apple',ItemType.HEAL,15));
	---	
*/
function PlayerInvItemAdd(pl,itm)
{
	pl.inventory.len += 1;
	pl.inventory.items[len] = itm;
}

function PlayerToJson(pl)
{
	pl.socket = null;
	return JSON.stringify(pl);
}
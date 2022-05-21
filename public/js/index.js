const INPUT_PRIFIX = "input_name_";
const TEXT_PRIFIX = "text_name_";
const BTN_PRIFIX = "btn_name_";
const EXPENSE_SUFFIX = "_expense_";

function update_input(event) {
   const current_item_number = event.target.parentNode.id;
   const is_input = event.target.tagName === "INPUT" ? true : false;
   const input_name_tag = document.getElementById(INPUT_PRIFIX + current_item_number);
   const span_name_tag = document.getElementById(TEXT_PRIFIX + current_item_number);

   if(!input_name_tag.value) {
      return false;
   }
   span_name_tag.innerHTML = input_name_tag.value;
   input_name_tag.style.display = (is_input) ? "none" : "inline-block";
   span_name_tag.style.display = (is_input) ? "inline-block" : "none";
}

function update_expense(event) {
   const current_input_id = event.target.id;
   const is_input = event.target.tagName === "INPUT" ? true : false;
   const is_amount = event.target.id.includes("amount");
   let updated_tag_id = (is_input) ? current_input_id.replace("input", "item") : current_input_id.replace("item", "input");
   if(is_amount) {
      updated_tag_id = (is_input) ? current_input_id.replace("iamount", "amount") : current_input_id.replace("amount", "iamount");
   }
   else {
      updated_tag_id = (is_input) ? current_input_id.replace("input", "item") : current_input_id.replace("item", "input");
   }

   const span_tag = (is_input) ? document.getElementById(updated_tag_id) : document.getElementById(current_input_id);
   const input_tag = (is_input) ? document.getElementById(current_input_id) : document.getElementById(updated_tag_id);
   if((is_amount && (isNaN(input_tag.value) || input_tag.value === ""))) {
      return false;
   }
   if(is_amount) {
      update_outcome_total(current_input_id, Number(input_tag.value), Number(span_tag.innerHTML));
      console.log(Number(span_tag.innerHTML))
   }
   span_tag.innerHTML = input_tag.value;

   if(span_tag.innerHTML.length === 0) {
      span_tag.innerHTML = "Some Expense"
   }
   input_tag.style.display = (is_input) ? "none" : "inline-block";
   span_tag.style.display = (is_input) ? "inline-block" : "none";
}

function update_outcome_total(current_input_id, current_input_value, original_span_value) {
   const parent_id = current_input_id.split("_")[0];
   const current_outcome_total_span = document.getElementById("outcome_total_" + parent_id);
   current_outcome_total_span.innerText = Number(current_outcome_total_span.innerText) + current_input_value - original_span_value;
}

function update_amount(event) {
   const current_input_id = event.target.id;
   const is_input = event.target.tagName === "INPUT" ? true : false;
   const updated_tag_id = (is_input) ? current_input_id.replace("iamount", "amount") : current_input_id.replace("amount", "iamount");
   const span_tag = (is_input) ? document.getElementById(updated_tag_id) : document.getElementById(current_input_id);
   const input_tag = (is_input) ? document.getElementById(current_input_id) : document.getElementById(updated_tag_id);
   span_tag.innerHTML = input_tag.value;
   input_tag.style.display = (is_input) ? "none" : "inline-block";
   span_tag.style.display = (is_input) ? "inline-block" : "none";
}

function remove_parent(event) {
   return event.target.parentNode.remove();
}

function add_person() {
   
   const all_data_div = document.getElementById("all_data");
   const all_info = document.getElementsByClassName("info");
   let new_id;
   if(all_info.length === 0) {
      new_id = 0;
   }
   else {
      new_id = (Number(all_info[all_info.length - 1].id) + 1).toString();
   }
   const currrent_new_div = document.createElement("div");
   currrent_new_div.id = new_id;
   currrent_new_div.className = "info";

   const currrent_title = document.createElement("strong");
   currrent_title.innerText = "Name: ";
   currrent_new_div.appendChild(currrent_title);

   const current_input = document.createElement("input");
   current_input.id = INPUT_PRIFIX + new_id;
   current_input.style.width = "100px";
   enter_as_click(current_input, update_input);

   const current_span = document.createElement("span");
   current_span.id = TEXT_PRIFIX + new_id;
   current_span.onclick = update_input;
   current_span.style.display = "none";
   current_span.style.width = "100px";
   
   const current_add_expense_btn = document.createElement("button");
   current_add_expense_btn.id = BTN_PRIFIX + new_id.toString();
   current_add_expense_btn.innerText = "Add Expense";
   current_add_expense_btn.value = new_id;
   current_add_expense_btn.onclick = add_outcome;

   const current_remove_btn = document.createElement("button");
   current_remove_btn.id = BTN_PRIFIX + new_id;
   current_remove_btn.innerText = "Remove";
   current_remove_btn.value = new_id;
   current_remove_btn.onclick = remove_parent;

   const outcome_strong = document.createElement("strong");
   outcome_strong.innerText = "Outcome Total: "
   const outcome_span = document.createElement("span");
   outcome_span.innerText = 0;
   outcome_span.id = "outcome_total_" + new_id;
   outcome_strong.appendChild(outcome_span);

   const current_expense_div = document.createElement("div");
   current_expense_div.id = new_id + EXPENSE_SUFFIX;

   const current_hr_line = document.createElement("hr");

   currrent_new_div.appendChild(current_input);
   currrent_new_div.appendChild(current_span);
   currrent_new_div.appendChild(current_add_expense_btn);
   currrent_new_div.appendChild(current_remove_btn);
   currrent_new_div.appendChild(current_expense_div);
   current_expense_div.appendChild(outcome_strong);
   currrent_new_div.appendChild(current_hr_line);
   all_data_div.appendChild(currrent_new_div);
}

function add_outcome(event) {
   const current_parent_id = event.target.parentNode.id
   const current_expense_id = current_parent_id.toString() + EXPENSE_SUFFIX;
   const current_expense_div = document.getElementById(current_expense_id);

   const current_expense_group = document.getElementsByClassName(current_expense_id + "item");
   let new_series_number;
   if(current_expense_group.length === 0) {
      new_series_number = 1;
   }
   else {
      new_series_number = (Number(current_expense_group[current_expense_group.length - 1].id.split("_").pop()) + 1);
   }
   const new_expense_id = current_expense_id + new_series_number.toString();

   const new_expense_div = document.createElement("div");
   new_expense_div.className = current_expense_id + "item";
   new_expense_div.id = new_expense_id;

   const new_expense_input = document.createElement("input");
   new_expense_input.id = current_expense_id + "input_" + new_series_number.toString();
   new_expense_input.placeholder = "item, ex: restaurant";
   new_expense_input.style.display = "none";
   enter_as_click(new_expense_input, update_expense);

   const new_expense_span = document.createElement("span");
   new_expense_span.id = current_expense_id + "item_" + new_series_number.toString();
   new_expense_span.innerText = "Some Expense";
   new_expense_span.onclick = update_expense;

   const new_expense_arrow = document.createElement("strong");
   new_expense_arrow.innerText = "-> "

   const new_amount_input = document.createElement("input");
   new_amount_input.id = current_expense_id + "iamount_" + new_series_number.toString();
   new_amount_input.placeholder = "amount, ex: 300";
   enter_as_click(new_amount_input, update_expense);

   const new_expense_amount_span = document.createElement("span");
   new_expense_amount_span.style.width = "100px";
   new_expense_amount_span.id = current_expense_id + "amount_" + new_series_number.toString();
   new_expense_amount_span.onclick = update_expense;

   const new_expense_remove_btn = document.createElement("button");
   new_expense_remove_btn.innerText = "remove";
   new_expense_remove_btn.onclick = remove_parent;


   new_expense_div.appendChild(new_expense_input);
   new_expense_div.appendChild(new_expense_span);
   new_expense_div.appendChild(new_expense_arrow);
   new_expense_div.appendChild(new_amount_input);
   new_expense_div.appendChild(new_expense_amount_span);
   new_expense_div.appendChild(new_expense_remove_btn);

   current_expense_div.appendChild(new_expense_div);
}

function enter_as_click(dom, func) {
   dom.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
         event.preventDefault();
         func(event);
       }
   })
}

function split() {
   const all_infos = document.getElementsByClassName("info");
   let outcome_array = [];
   let names_array = [];
   for(let i = 0; i < all_infos.length; i ++) {
      const personal_outcome = Number(document.getElementById("outcome_total_" + all_infos[i].id.toString()).innerText);
      const person_name = document.getElementById("text_name_" + all_infos[i].id.toString()).innerText;
      names_array.push(person_name);
      outcome_array.push(personal_outcome);
   }
   let expense_array = calculate_expense(outcome_array);
   calculate_spliting_expense(expense_array, names_array)
}


function calculate_expense(outcome_array) {
   let sum = 0;
   outcome_array.forEach(e => sum += e);
   let average_expense = Math.ceil(sum / outcome_array.length);
   let expense_array = [];
   outcome_array.forEach(e => expense_array.push(e - average_expense));
   
   return expense_array;
}


function calculate_spliting_expense(expense_array, names_array) {
   let expense_mem = {};
   let name_exclude_zero = [];
   let expense_obj = {};

   for(let i = 0; i < expense_array.length; i ++) {
      if(expense_array[i] !== 0) {
         name_exclude_zero.push(names_array[i]);
         expense_mem[names_array[i]] = expense_array[i];
      }
   }

   for(let i = 0; i < name_exclude_zero.length; i ++) {
      if(expense_mem[names_array[i]] < 0) {
         expense_obj[names_array[i]] = Array(name_exclude_zero.length).fill(0);
      }
   }
   
   name_exclude_zero.sort((a, b) => {return expense_mem[b] - expense_mem[a]});
   let left = 0;
   let right = name_exclude_zero.length - 1;

   while(left < right) {
      let give_money_person = name_exclude_zero[right];
      let get_money_person = name_exclude_zero[left];
      if(expense_mem[get_money_person] + expense_mem[give_money_person] >= 0) {
         expense_obj[give_money_person][left] = expense_mem[give_money_person];
         expense_mem[get_money_person] += expense_mem[give_money_person];
         expense_mem[give_money_person] = 0;
         right --;
      }
      else {
         expense_obj[give_money_person][left] -= expense_mem[get_money_person];
         expense_mem[give_money_person] += expense_mem[get_money_person];
         expense_mem[get_money_person] = 0;
         left++
      }
   }

   console.log(expense_obj);
   console.log(name_exclude_zero);
   add_result(expense_obj, name_exclude_zero);
}


function add_result(expense_obj, name_exclude_zero) {
   const spliting_result_div = document.getElementById("spliting_result");
   while(spliting_result_div.firstChild) {
      spliting_result_div.firstChild.remove();
   }

   const current_flow_title = document.createElement("strong");
   current_flow_title.innerText = "How to split?"
   spliting_result_div.appendChild(current_flow_title);

   for(let key in expense_obj) {
      for(let i = 0; i < expense_obj[key].length; i++) {
         if(expense_obj[key][i] < 0) {
            const current_flow_div = document.createElement("div");
            current_flow_div.innerText = `${key} give ${name_exclude_zero[i]} $${expense_obj[key][i]* -1}.`;
            spliting_result_div.appendChild(current_flow_div);
         }

      }
   }
   if(name_exclude_zero.length === 0) {
      const current_flow_div = document.createElement("div");
      current_flow_div.innerText = "No actions need."
      spliting_result_div.appendChild(current_flow_div);
   }
}
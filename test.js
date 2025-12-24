//$ TEST V0.0.1

const doc = _(document);
// console.log(doc);
//! [BUG] bug found (unassigned case for document)
//+ [FIXED] => JS {#nodes: Array(1), #grab: ƒ}

const ele1 = _("main");
// console.log(ele1);
//= [PASSED]

const ele2 = _(document.getElementById("searchInput"));
// console.log(ele2);
//= [PASSED]

const ele3 = _(document.querySelector("#searchInput"));
// console.log(ele3);
//= [PASSED]

const elements = _(document.querySelectorAll(".filter-btn"));
// console.log(elements);
//= [PASSED]

const elements2 = _([".filter-btn", "#searchInput", "svg"]);
// console.log(elements2);
//= [PASSED]

const elements3 = _([".filter-btn", document.querySelector("#searchInput")]);
// console.log(elements3);
//= [PASSED]

const elements4 = _(["#searchInput", document.querySelector("#searchInput")]);
// console.log(elements4);
//= [PASSED] (no duplicates)

const factory = JS.from("main");
// console.log(factory);
//= [PASSED]

const length = _(".filter-btn").length();
// console.log(length);
//= [PASSED] (5)

const first = _(".filter-btn").first();
// console.log(first);
//= [PASSED]

const last = _(".filter-btn").last();
// console.log(last);
//= [PASSED]

const third = _(".filter-btn").at(2);
// console.log(third);
//= [PASSED]

const last2 = _(".filter-btn").at(-1);
// console.log(last2);
//= [PASSED] (negative index reverse the count direction)

const beforeLast = _(".filter-btn").at(-2);
// console.log(beforeLast);
//= [PASSED] (negative index reverse the count direction)

_(".filter-btn").each(n => {
  // console.log(n);
});
//= [PASSED]

const parent = _(".filter-btn").parent();
// console.log(parent);
//= [PASSED]

const children = _(".filters").children();
// console.log(children);
//! [BUG] bug found (children return collection instead of array)
//+ [FIXED] => [button.filter-btn.active, button.filter-btn, button.filter-btn, ...]

const html = _(".filters").html();
// console.log(html);
//= [PASSED]

_(".filters_omit").html("<h2>no filters</h2>");
_(".filter-btn_omit").html("just text");
_("body_omit").html("<p>wiped successfully</p>");
//= [PASSED]

_("_").html("<p>wiped successfully</p>");
//! [BUG] bug found (users can pass empty strings)
//+ [FIXED] Uncaught JSError: string selectors shouldn't be empty

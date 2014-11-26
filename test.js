/**
 * Created by User on 23/11/14.
 */

$(function () {

    var wrapper = document.getElementById('wrapper');

    // get json data using ajax request
    $.getJSON('/MoaTest/data.json',{}, function (data) {

        var ul = document.createElement('ul');
        ul.appendChild(makeTreeview('html',data['html']));

        wrapper.appendChild(ul);

        initialHideNodes();

        handleExpandCollapse();

    });

    // initially hide all tree node only leaving the root
    function initialHideNodes(){
        $.each($('.plusminus').siblings(), function(index, value){
            if(!$(value).is('label')){
                $(value).hide();
            }
        });
    }

    //handle click event to show or hide branches
    function handleExpandCollapse(){
        $('.plusminus').click(function(){
            if($(this).html()==='+'){
                $(this).html('-');
            }else{
                $(this).html('+');
            }


            $.each($(this).siblings(), function(index, value){
                if(!$(value).is('label')){
                    $(value).toggle();
                }
            });
        });
    }

    //this recursive function makes a tree view from json object
    //it takes parameters as name , value pair from json object
    function makeTreeview(name, val){
        var node = document.createElement('li');
        node.className = 'node';

        var plusminus = document.createElement('a');
        plusminus.className = 'plusminus';
        plusminus.href = 'javascript:void(0)'
        plusminus.innerHTML = '+';

        node.appendChild(plusminus);

        var label = document.createElement('label');
        label.innerHTML = name;
        node.appendChild(label);

        // val is string marking the end of recursion
        if(typeof val === 'string'){
            var v = document.createElement('pre');
            v.className = 'value';
            val = val.replace(/\r/g , '\\r').replace(/\n/g , '\\n');

            v.innerHTML = val;

            var ul = document.createElement('ul');
            ul.appendChild(v);
            node.appendChild(ul);

            return node;
        }

        if(name==='children'){
            var ul = document.createElement('ul');

            $.each(val, function(index, value){
                $.each(value, function(k,v){
                    ul.appendChild(makeTreeview(k,v));
                });

            });

            node.appendChild(ul);
        }
        else{
            var ul = document.createElement('ul');
            $.each(val, function(key, value){

                ul.appendChild(makeTreeview(key,value));

            });

            node.appendChild(ul);
        }

        return node
    }

});

$(".deleteKafe").click(function(){
	$.ajax({
		url: '/admin/'+this.id,
		type: 'DELETE',
		success: function(result){
			alert('Kafe deleted!');
			location.reload();
		}
	});
	location.reload();
});

$(".deleteMenu").click(function(){
	alert("sesuatu");
	$.ajax({
		url: '/admin/detail/'+this.id,
		type: 'DELETE',
		success: function(result){
			alert('Kafe deleted!');
			location.reload();
		}
	});
	location.reload();
});


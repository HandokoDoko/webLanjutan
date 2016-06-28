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


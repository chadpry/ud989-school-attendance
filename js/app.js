var model = {

    students: [
        {
            name: 'Slappy the Frog',
            daysAbsent: 0
        },
        {
            name: 'Lilly the Lizard',
            daysAbsent: 0
        },
        {
            name: 'Paulrus the Walrus',
            daysAbsent: 0
        },
        {
            name: 'Gregory the Goat',
            daysAbsent: 0
        },
        {
            name: 'Adam the Anaconda',
            daysAbsent: 0
        }
    ],
    numDays: 12
};

var controller = {
    init: function () {
        view.init();
    },
    getStudents: function () {
        return model.students;
    },
    getNumDays: function () {
        return model.numDays;
    },
    updateDaysMissed(index,days){
        model.students[index].daysAbsent=days;
    }

};

var view = {
    init: function () {
        this.headerRow = jQuery('table thead tr');
        this.tableBody = jQuery('table tbody');
        this.students = controller.getStudents();
        this.renderUI();
        this.renderDaysMissed();
    },
    renderUI: function () {
        
        //build header row
        jQuery('<th/>', {
            html: 'Student Name'
        }).appendTo(this.headerRow);

        for (var x = 1; x <= controller.getNumDays(); x++) {
            jQuery('<th/>', {
                html: x
            }).appendTo(this.headerRow);
        }

        jQuery('<th/>', {
            html: 'Days Missed',
            class: 'missed-col'
        }).appendTo(this.headerRow);
        
        //build student list
        for (var x = 0; x < this.students.length; x++) {
            var studentRow = jQuery('<tr/>', {
                class: 'student'
            });
            var studentCell = jQuery('<td/>', {
                    class: 'name-col',
                    html: this.students[x].name
                })
                .appendTo(studentRow);
            studentRow.appendTo(this.tableBody);
            //build checkboxes
            for (var y = 1; y<= controller.getNumDays(); y++) {
                var checkbox=jQuery('<input/>',{
                    type:'checkbox'
                }).on('click',this.renderDaysMissed);
                jQuery('<td/>', {
                    class:'attend-col'
                })
                .append(checkbox)
                .appendTo(studentRow);
            }
            jQuery('<td/>', {
                    class:'missed-col',
                    html:this.students[x].daysAbsent
            })
            .appendTo(studentRow);
        }

    },
    renderDaysMissed: function(){
        var studentRows=jQuery('tr.student'); 
        for(var x=0;x<studentRows.length;x++){
            var daysMissedContainer=jQuery(studentRows[x]).children('.missed-col');
            var studentColCheckboxes=jQuery(studentRows[x]).children('.attend-col').children('input');
            var totalDaysMissed=0;
            for(var y=0; y<studentColCheckboxes.length; y++){
                if(!jQuery(studentColCheckboxes[y]).is(':checked')){
                    totalDaysMissed++;
                }                
            }
            daysMissedContainer.html(totalDaysMissed);
            controller.updateDaysMissed(x,totalDaysMissed);
        }        
    }
};
controller.init();
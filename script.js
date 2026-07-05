let highestZ = 1;

interact(".window")

.draggable({

    allowFrom: ".title-bar",

    listeners:{

        move(event){

            const target = event.target;

            const x =
                (parseFloat(target.dataset.x) || 0)
                + event.dx;

            const y =
                (parseFloat(target.dataset.y) || 0)
                + event.dy;

            target.style.transform =
                `translate3d(${x}px, ${y}px, 0)`;

            target.dataset.x = x;
            target.dataset.y = y;
        }
    }

})

.resizable({

    margin:8,

    edges:{
        top:true,
        left:true,
        bottom:true,
        right:true
    },

    listeners:{

        move(event){

            const target = event.target;

            let x = parseFloat(target.dataset.x) || 0;
            let y = parseFloat(target.dataset.y) || 0;

            target.style.width =
                `${event.rect.width}px`;

            target.style.height =
                `${event.rect.height}px`;

            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.transform =
                `translate3d(${x}px, ${y}px, 0)`;

            target.dataset.x = x;
            target.dataset.y = y;
        }
    },

    modifiers:[

        interact.modifiers.restrictSize({

            min:{
                width:350,
                height:220
            }

        })

    ]
});

document.querySelectorAll(".window").forEach(win=>{

    win.addEventListener("mousedown",()=>{

        highestZ++;

        win.style.zIndex = highestZ;

        document.querySelectorAll(".window").forEach(w=>{

            w.classList.remove("active");

        });

        win.classList.add("active");

    });

});
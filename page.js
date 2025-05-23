class Page {
    constructor(poem, name) {
        this.name = name;
        this.poem = poem;
        this.parents = [];
        this.children = [];
    }

    loadPage() {
        this.clearNav();
        this.loadPoem();
        this.appendPath();
        
        if (this.parents.length > 0) {
            let nav1 = this.createNav();
            for (let i = 0; i < this.parents.length; i++) {
                this.addButt(nav1,this.parents[i]);
            }
        }

        this.addSpan(this.createNav(), this.name);
        if (this.children.length > 0) {
            let nav2 = this.createNav();
            for (let i = 0; i < this.children.length; i++) {
                this.addButt(nav2,this.children[i]);
            }
        }
    }

    loadPoem() {
        let txt = '';
        for (let i = 1; i<this.poem.length;i++) {
            txt = txt + '<br>' + this.poem[i];
        };
        title.html(this.poem[0]);
        p.html(txt);
    }

    appendPath() {
    let path_string = '';
    let n = 0;
    for (let i = 0; i < path_list.length; i++) {
        if (path_list[i] == this.name) {
        path_list.pop();
        n = 1;
        }
    }
    if (n == 0) {
        path_list = path_list.concat(this.name);
    }
    
    for (let i = 0; i < path_list.length; i++) {
        path_string = path_string.concat(path_list[i]);
        path_string = path_string.concat('/');
    }
    path.html(path_string);
    }

    clearNav() {
        let n = ndiv.child().length
        for (let i=0; i < n; i++) {
            ndiv.child()[0].remove();
        };
    }

    createNav() {
    let nav = createElement('li').parent(createElement('nav').parent(ndiv));
    return nav;
    }

    addButt(nav,page) {
        let butt = createButton(page.name).parent(nav);
        butt.mousePressed(function() {
        page.loadPage();
  });
    }

    addSpan(nav) {
    createElement('span').html(this.name).parent(nav);
    }
}